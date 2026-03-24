import React, { useState } from "react";
import { Copy, Download, Check, RefreshCw, ChevronLeft, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PromptOutputProps {
  prompt: string;
  onRegenerate: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export const PromptOutput: React.FC<PromptOutputProps> = ({ prompt, onRegenerate, onBack, isLoading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([prompt], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "viberiya-prompt.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Wizard
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Regenerate
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Share2 className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Generated Prompt</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                copied ? "bg-green-100 text-green-700" : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium transition-all"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-white">
          <pre className="whitespace-pre-wrap font-mono text-sm sm:text-base text-gray-800 leading-relaxed overflow-x-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-gray-500 animate-pulse">Gemini is crafting your professional prompt...</p>
              </div>
            ) : (
              prompt
            )}
          </pre>
        </div>
      </motion.div>

      {!isLoading && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
          <div className="p-1 bg-blue-100 rounded-full mt-0.5">
            <Check className="w-3 h-3 text-blue-600" />
          </div>
          <p className="text-sm text-blue-800 leading-relaxed">
            <strong>Pro Tip:</strong> Paste this prompt directly into Google AI Studio, Lovable.dev, or Bolt.new to build your application. It's optimized for token efficiency and structured for maximum clarity.
          </p>
        </div>
      )}
    </div>
  );
}
