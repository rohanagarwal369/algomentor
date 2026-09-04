import React from 'react';
import { X, Trophy, Flame } from 'lucide-react';
import { DSAProgressView } from './DSAProgressView';
import { useApp } from '../context/AppContext';

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProgressModal: React.FC<ProgressModalProps> = ({ isOpen, onClose }) => {
  const { dsaProgress } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
      <div 
        id="dsa-progress-modal"
        className="bg-[#161b22] border border-[#30363d] rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#30363d] bg-[#1c2128]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#58a6ff]/15 text-[#58a6ff] rounded-xl border border-[#58a6ff]/30 shadow-inner">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#e6edf3]">
                  DSA Progress Tracker
                </h2>
                <span className="text-[10px] font-mono text-[#58a6ff] bg-[#58a6ff]/10 px-2 py-0.5 rounded-full border border-[#58a6ff]/30 font-semibold">
                  Overall Journey
                </span>
              </div>
              <p className="text-xs text-[#8b949e] mt-0.5">
                Comprehensive mastery across data structures, algorithms, and practical problem solving
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0d1117] border border-[#30363d] text-xs font-mono text-orange-400 font-bold">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{dsaProgress.currentStreak}d Streak</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#30363d] rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: DSA-Wise Progress Hierarchy */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1">
          <DSAProgressView onClose={onClose} />
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-[#30363d] bg-[#1c2128] flex items-center justify-between text-xs text-[#8b949e]">
          <div className="font-mono text-[11px] truncate">
            Completed: <span className="text-[#e6edf3] font-semibold">{dsaProgress.topicsCompleted}/{dsaProgress.totalTopics} topics</span> • Solved: <span className="text-[#3fb950] font-semibold">{dsaProgress.problemsSolved} problems</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] text-xs font-semibold transition-colors cursor-pointer shrink-0 ml-3"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
