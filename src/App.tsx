import { useState } from 'react';
import UploadCard from './components/UploadCard';
import ResultCard from './components/ResultCard';
import { analyzeBill, type AnalysisResponse } from './api';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react'; // Added for custom visual alerts

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (file: File) => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const data = await analyzeBill(file);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center p-4 sm:p-8"
      style={{
        backgroundImage: `url('/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Subtle overlay for contrast */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>

      {/* Tax Sleuth Branding */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
        <h1
          className="text-white text-2xl md:text-3xl font-normal tracking-wide drop-shadow-md"
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          Tax Sleuth
        </h1>
      </div>

      <main className="z-10 w-full max-w-sm">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl relative overflow-hidden min-h-[280px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">Scan Your Bill</h2>
                  <p className="text-gray-500 text-sm">Upload a receipt to check for validity.</p>
                </div>
                
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, height: 0 }} 
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-[13px] flex items-center border border-red-100 overflow-hidden"
                    >
                      <AlertCircle className="w-5 h-5 mr-2.5 flex-shrink-0" />
                      <span className="font-medium italic leading-tight">{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <UploadCard onAnalyze={handleAnalyze} isLoading={loading} />
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ResultCard result={result} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default App;


