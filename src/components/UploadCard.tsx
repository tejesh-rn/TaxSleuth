import React, { useCallback, useState } from 'react';
import { UploadCloud, FileImage, X, Loader2 } from 'lucide-react';

interface UploadCardProps {
  onAnalyze: (file: File) => void;
  isLoading: boolean;
}

const UploadCard: React.FC<UploadCardProps> = ({ onAnalyze, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const isImageMime = file.type.startsWith('image/');
    const isImageExt = file.name.match(/\.(jpg|jpeg|png|gif|webp|heic|heif)$/i);
    if (!isImageMime && !isImageExt) {
      alert('Please upload an image file.');
      return;
    }
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all bg-gray-50/50 hover:bg-gray-50 ${
            dragActive ? 'border-gray-800 bg-gray-100/80' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label="Upload file"
          />
          <div className="bg-white p-3 rounded-full shadow-sm border border-gray-100 mb-3">
            <UploadCloud className="w-6 h-6 text-gray-700" />
          </div>
          <h3 className="font-semibold text-base text-gray-800 mb-1">Drag & Drop your bill</h3>
          <p className="text-gray-500 text-xs">or click anywhere to browse files</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white">
            <img 
              src={preview!} 
              alt="Scan Preview" 
              className="w-full h-40 object-cover sm:object-contain bg-gray-50"
            />
            <button
              onClick={() => { setSelectedFile(null); setPreview(null); }}
              disabled={isLoading}
              className="absolute top-2 right-2 p-1 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-0 inset-x-0 bg-white/95 border-t border-gray-100 p-2 flex items-center">
               <FileImage className="w-4 h-4 mr-2 text-gray-500" />
               <span className="text-xs text-gray-700 font-medium truncate">{selectedFile.name}</span>
            </div>
          </div>
          
          <button
            onClick={() => onAnalyze(selectedFile)}
            disabled={isLoading}
            className={`w-full py-2.5 rounded-xl font-medium flex items-center justify-center transition-all ${
              isLoading 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                : 'bg-black hover:bg-gray-900 text-white shadow-md active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Scanning...</>
            ) : (
              'Scan Verification'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadCard;


