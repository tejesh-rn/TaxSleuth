import { GoogleGenerativeAI } from "@google/generative-ai";

export interface AnalysisResponse {
  gst_valid: boolean;
  total_valid: boolean;
  gst_rate: number;
  expected_gst: number;
  charged_gst: number;
  gstin: string;
  issues: string[];
}

export const analyzeBill = async (file: File): Promise<AnalysisResponse> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_api_key_here") {
    throw new Error("Please add your VITE_GEMINI_API_KEY to the .env file in the frontend folder.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  // Safe and fast base64 conversion for browser
  const base64String = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Get only the base64 data, ignoring the data URI prefix 
      resolve(result.split(',')[1] || '');
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });

  const imageParts = [
    {
      inlineData: {
        data: base64String,
        mimeType: file.type,
      },
    },
  ];

  const prompt = `
You are an expert Indian Tax Auditor and SLEUTH. Check this restaurant/shopping bill image carefully.
Extract the following information and evaluate the validity of the tax calculations based on Indian GST slabs (e.g., 5%, 12%, 18%). 
CRITICAL RULE 1: Take note of any Service Charges or Service Taxes. Service charge is strictly optional in India, so if it is applied to the subtotal forcefully, flag it as a discrepancy in the "issues" array.
CRITICAL RULE 2: Ignore minor fractional rounding errors! Rounding off (e.g., differences of a few rupees or fraction of a rupee) is standard accounting practice, rarely cheating. Only flag GST or total overcharges if the difference strictly exceeds ₹2.

Return your response strictly as a pure JSON object. No Markdown blocks, no backticks, just the RAW JSON mapping to this schema:
{
  "is_bill": boolean, // false if not a bill, receipt, or invoice at all
  "gstin": "string", // The 15-char GSTIN number extracted, or "NOT_FOUND" if unavailable
  "gst_valid": boolean, // Check if the GSTIN string format matches Indian standard 15-char code structurally.
  "gst_rate": number, // The percentage slab found (e.g., 5, 12, 18).
  "expected_gst": number, // Calculate this strictly based on (Subtotal * gst_rate / 100).
  "charged_gst": number, // The actual total GST printed on the bill.
  "total_valid": boolean, // true if expected_gst == charged_gst AND no forced service charges exist. false otherwise.
  "issues": ["string", "string"] // Explain discrepancies. Example: "Forced service charge detected which is optional", "GST overcharged by 20rs". Leave array empty if completely clean.
}
  `;

  try {
    const result = await model.generateContent([prompt, ...imageParts]);
    const responseText = result.response.text();
    
    // Attempt robust parsing
    const match = responseText.match(/\{[\s\S]*\}/);
    const cleanJson = match ? match[0] : responseText;
    
    let data;
    try {
      data = JSON.parse(cleanJson);
    } catch(e) {
      throw new Error(`AI returned malformed JSON: ${responseText}`);
    }

    if (data.is_bill === false) {
      throw new Error("Bill not detected in image.");
    }

    let isGstValid = data.gst_valid || false;
    let issues = data.issues || [];

    return {
      gst_valid: isGstValid,
      total_valid: data.total_valid || false,
      gst_rate: data.gst_rate || 0,
      expected_gst: data.expected_gst || 0,
      charged_gst: data.charged_gst || 0,
      gstin: data.gstin || 'NOT_FOUND',
      issues: issues
    };
  } catch (err: any) {
    console.error("AI Error:", err);
    if (err.message && (err.message.includes("Bill not detected") || err.message.includes("VITE_GEMINI_API"))) {
      throw err;
    }
    // Propagate actual error up to the UI 
    throw new Error(`Processing Failed: ${err?.message || "Unknown error occurred"}`);
  }
};
