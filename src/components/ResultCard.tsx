import React from 'react';
import type { AnalysisResponse } from '../api';
import { StatusBadge } from './StatusBadge';
import { FileText, IndianRupee, Percent, AlertCircle, ArrowLeft, ShieldCheck, ShieldAlert } from 'lucide-react';

interface ResultCardProps {
  result: AnalysisResponse | null;
  onReset?: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  if (!result) return null;

  const hasIssues = result.issues.length > 0;

  return (
    <div className="w-full text-left flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      
      {/* Header */}
      <div className={`p-4 flex items-center gap-3 border-b border-gray-100 ${hasIssues ? 'bg-red-50/50' : 'bg-emerald-50/50'}`}>
        <div className={`p-2 rounded-full ${hasIssues ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
          {hasIssues ? <ShieldAlert className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
        </div>
        <div>
          <h2 className={`text-base font-semibold ${hasIssues ? 'text-red-900' : 'text-emerald-900'}`}>
            {hasIssues ? "Possible Discrepancies" : "Bill Validated"}
          </h2>
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* Detail Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="flex items-center text-gray-500 mb-1">
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              <span className="text-xs font-medium uppercase tracking-wider">GSTIN Number</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono font-semibold text-sm text-gray-900 truncate max-w-[50%]">
                {result.gstin}
              </span>
              <StatusBadge 
                status={result.gst_valid ? 'valid' : 'invalid'} 
                text={result.gst_valid ? 'Valid' : 'Invalid'} 
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div className="flex items-center text-gray-500 mb-1">
              <Percent className="w-3.5 h-3.5 mr-1.5" />
              <span className="text-xs font-medium uppercase tracking-wider">Detected GST Rate</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              {result.gst_rate}%
            </span>
          </div>
          
        </div>

        {/* Amount Comparison */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-gray-700">
              <IndianRupee className="w-4 h-4 mr-2" />
              <span className="font-semibold text-sm">Tax Amount Check</span>
            </div>
            <StatusBadge 
                status={result.total_valid ? 'valid' : 'invalid'} 
                text={result.total_valid ? 'Match' : 'Mismatch'} 
              />
          </div>
          
          <div className="space-y-1 text-sm">
             <div className="flex justify-between items-center py-1.5 border-b border-gray-200 border-dashed">
                <span className="text-gray-600">Expected GST</span>
                <span className="font-semibold text-gray-900">₹{result.expected_gst.toFixed(2)}</span>
             </div>
             
             <div className="flex justify-between items-center py-1.5">
                <span className="text-gray-600">Charged GST</span>
                <span className={`font-semibold ${result.charged_gst > result.expected_gst ? 'text-red-600' : 'text-gray-900'}`}>
                  ₹{result.charged_gst.toFixed(2)}
                </span>
             </div>
          </div>
        </div>

        {/* Issues List */}
        {hasIssues && (
          <div className="pt-3 border-t border-gray-100">
            <h3 className="font-medium text-xs uppercase tracking-wide text-gray-500 mb-2 block">Identified Issues</h3>
            <ul className="space-y-1.5">
              {result.issues.map((issue, idx) => (
                <li key={idx} className="flex items-start text-red-800 bg-red-50 p-2 rounded-lg border border-red-100">
                  <AlertCircle className="w-3.5 h-3.5 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                  <span className="text-xs font-medium">{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {onReset && (
          <div className="mt-2 pt-3 flex justify-between gap-4 border-t border-gray-100">
            <button
              onClick={onReset}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg flex items-center justify-center transition-colors shadow-sm active:scale-[0.98]"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-2" />
              Scan Another Bill
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResultCard;



