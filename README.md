# 🕵️ Tax Sleuth

![Tax Sleuth](https://img.shields.io/badge/Status-Active-brightgreen)
[![LinkedIn](https://img.shields.io/badge/Connect_on-LinkedIn-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/tejeshrn/)

**Tax Sleuth** is an AI-powered financial web application designed to empower consumers against overcharging and deceptive billing. By leveraging Google's **Gemini Vision API**, the app thoroughly analyzes restaurant, shopping, or service bills, detecting forced service charges, validating input GSTIN formats, and verifying if the calculated GST aligns with standard Indian tax slabs (e.g., 5%, 12%, 18%).

## ✨ Core Features

- **Intelligent Bill Parsing:** Upload an image of your bill and seamlessly extract tax information.
- **GST Validity Checker:** Verifies structural validities of GSTIN against standard 15-character codes.
- **Accurate Mathematical Audits:** Calculates and compares the actual charged GST versus the expected GST on the subtotal.
- **Fraud Detection:** Specially designed to flag rigid non-optional service charges and identify discrepancies strictly greater than ₹2 (ignoring minor fractional rounding issues).
- **Responsive & Modern UI:** Built with **React 19**, **Tailwind CSS V4**, and enriched with elegant **Framer Motion** animations.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling & UI:** Tailwind CSS, Framer Motion, Lucide React
- **AI Integration:** Google Generative AI (`@google/generative-ai`)

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your device. You will also need a **Google Gemini API Key**.

### Installation

1. **Clone the repository (or extract the folder):**
   ```bash
   git clone https://github.com/tejesh-rn/TaxSleuth.git
   cd TaxSleuth
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your Gemini API Key.
   ```bash
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **Visit the Application:**
   Open your browser and navigate to `http://localhost:5173`.

## 🤝 Let's Connect

If you'd like to reach out, discuss the project, or explore opportunities, let's connect on LinkedIn!

[![LinkedIn](https://img.shields.io/badge/Connect_on-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/tejeshrn/)
