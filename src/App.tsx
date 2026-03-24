import React, { useState, useEffect } from "react";
import { Menu, Key, Plus, History as HistoryIcon, Zap, Github } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ProjectRequirements, GeneratedPrompt } from "./types";
import { generatePrompt } from "./services/geminiService";
import { ApiKeyModal } from "./components/ApiKeyModal";
import { Wizard } from "./components/Wizard";
import { PromptOutput } from "./components/PromptOutput";
import { HistoryPanel } from "./components/HistoryPanel";

export default function App() {
  const [apiKey, setApiKey] = useLocalStorage<string>("viberiya_api_key", "");
  const [history, setHistory] = useLocalStorage<GeneratedPrompt[]>("viberiya_history", []);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentRequirements, setCurrentRequirements] = useState<ProjectRequirements | undefined>(undefined);

  useEffect(() => {
    if (!apiKey) {
      setIsApiKeyModalOpen(true);
    }
  }, [apiKey]);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    setIsApiKeyModalOpen(false);
  };

  const handleGenerate = async (requirements: ProjectRequirements) => {
    if (!apiKey) {
      setIsApiKeyModalOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentRequirements(requirements);
    setCurrentPrompt(""); // Clear previous prompt to show loading state

    try {
      const prompt = await generatePrompt(apiKey, requirements);
      setCurrentPrompt(prompt);
      
      // Save to history
      const newHistoryItem: GeneratedPrompt = {
        id: Math.random().toString(36).substr(2, 9),
        title: requirements.projectName || "Untitled Project",
        content: prompt,
        date: new Date().toISOString(),
        requirements,
      };
      setHistory([newHistoryItem, ...history]);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setCurrentPrompt(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistory = (item: GeneratedPrompt) => {
    setCurrentPrompt(item.content);
    setCurrentRequirements(item.requirements);
    setIsHistoryOpen(false);
  };

  const handleDeleteHistory = (id: string) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  const handleReset = () => {
    setCurrentPrompt(null);
    setCurrentRequirements(undefined);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Open History"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleReset}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">Viberiya</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
              title="Settings"
            >
              <Key className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-4 mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-between gap-4"
            >
              <p className="text-sm text-red-700 font-medium">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="text-xs font-bold text-red-800 uppercase tracking-wider hover:underline"
              >
                Dismiss
              </button>
            </motion.div>
          )}

          {currentPrompt !== null ? (
            <PromptOutput
              key="output"
              prompt={currentPrompt as string}
              isLoading={isLoading}
              onRegenerate={() => currentRequirements && handleGenerate(currentRequirements)}
              onBack={() => setCurrentPrompt(null)}
            />
          ) : (
            <Wizard
              key="wizard"
              initialData={currentRequirements}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-100 mt-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-gray-400">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Viberiya Prompt Engineer</span>
          </div>
          <p className="text-xs text-gray-400 text-center max-w-md leading-relaxed">
            Professional prompt engineering tool for AI coding platforms. Optimized for Google AI Studio, Lovable.dev, and Bolt.new.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Panels */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onSave={handleSaveApiKey}
        onClose={apiKey ? () => setIsApiKeyModalOpen(false) : undefined}
        initialValue={apiKey}
      />

      <HistoryPanel
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelect={handleSelectHistory}
        onDelete={handleDeleteHistory}
      />
    </div>
  );
}
