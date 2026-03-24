import React from "react";
import { History, X, Trash2, Copy, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GeneratedPrompt } from "../types";

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: GeneratedPrompt[];
  onSelect: (prompt: GeneratedPrompt) => void;
  onDelete: (id: string) => void;
}

export function HistoryPanel({ isOpen, onClose, history, onSelect, onDelete }: HistoryPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-[70] w-full max-w-xs bg-white shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">History</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {history.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <History className="w-6 h-6 text-gray-300" />
                  </div>
                  <p className="text-sm text-gray-500">No history yet. Generate your first prompt to see it here.</p>
                </div>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-white border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => onSelect(item)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(item.id);
                        }}
                        className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all text-gray-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center text-xs text-blue-600 font-medium">
                      View details
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
