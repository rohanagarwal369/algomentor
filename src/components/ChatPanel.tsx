import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Send, 
  Lightbulb,
  FileCode,
  CheckCheck,
  HelpCircle,
  Clock,
  Bug,
  Globe2,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export const ChatPanel: React.FC = () => {
  const { 
    messages, 
    sendMessage, 
    isAiTyping, 
    activeTopic,
    hintLevel,
    requestNextHint,
    setHintLevel
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [showHintDropdown, setShowHintDropdown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiTyping]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;
    sendMessage(inputVal);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRequestHintLevel = (level: number) => {
    setShowHintDropdown(false);
    setHintLevel(level);
    sendMessage(`Please give me Level ${level} Hint for ${activeTopic.title}.`);
  };

  const promptChips = [
    { label: 'Time Complexity', query: `Explain the exact time and space complexity of ${activeTopic.title}.` },
    { label: 'Key Invariant', query: `What is the crucial invariant or edge case to check for ${activeTopic.title}?` },
    { label: 'Code Walkthrough', query: `Can you walk through the sample code line-by-line?` },
    { label: 'Find Edge Cases', query: `What corner/edge cases might fail on ${activeTopic.practiceProblem.title}?` }
  ];

  return (
    <div id="chat-panel" className="flex flex-col h-full bg-[#161b22] overflow-hidden">
      {/* Header with Screen Aware badge */}
      <div className="px-4 py-2 border-b border-[#30363d] flex items-center justify-between bg-[#1c2128] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#a371f7] rounded-full animate-pulse" />
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#a371f7] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#a371f7]" />
            Ask Gemini AI
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span 
            title="Gemini has context of your currently active topic, notes, and editor code."
            className="text-[9px] bg-[#a371f7]/15 text-[#a371f7] border border-[#a371f7]/40 px-2 py-0.5 rounded-full uppercase font-mono font-medium tracking-wider flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#a371f7]"></span>
            Screen Aware
          </span>
        </div>
      </div>

      {/* Contextual Action Bar (Progressive Hinting, ELI5, Hinglish, Code Review) */}
      <div className="px-3 py-2 bg-[#161b22] border-b border-[#30363d] flex flex-col gap-2 shrink-0">
        {/* Progressive Hint Control Bar */}
        <div className="flex items-center justify-between gap-2 p-1.5 bg-[#0d1117] rounded-lg border border-[#30363d] text-xs">
          <div className="flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-[#e3b341]" />
            <span className="text-[11px] font-medium text-[#e6edf3]">
              Hint Level {hintLevel}/5
            </span>
            <div className="flex items-center gap-0.5 ml-1">
              {[1, 2, 3, 4, 5].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => handleRequestHintLevel(lvl)}
                  title={`Request Level ${lvl} Hint`}
                  className={`w-4 h-4 rounded-xs text-[9px] font-mono font-bold flex items-center justify-center transition-colors ${
                    lvl <= hintLevel
                      ? 'bg-[#e3b341] text-[#0d1117]'
                      : 'bg-[#21262d] text-[#8b949e] hover:bg-[#30363d]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={requestNextHint}
            disabled={hintLevel >= 5}
            className="px-2 py-1 rounded bg-[#e3b341]/15 text-[#e3b341] hover:bg-[#e3b341]/25 text-[10px] font-semibold flex items-center gap-1 transition-colors disabled:opacity-40 cursor-pointer"
          >
            <span>{hintLevel >= 5 ? 'Full Solution' : `Get Level ${hintLevel + 1} Hint`}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Quick Context Actions */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
          <button
            onClick={() => sendMessage(`Explain ${activeTopic.title} in simple terms with a real-world analogy.`)}
            className="px-2 py-1 rounded-md bg-[#0d1117] hover:bg-[#21262d] text-[#58a6ff] border border-[#58a6ff]/30 hover:border-[#58a6ff] transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer shrink-0"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Explain Simply (ELI5)</span>
          </button>

          <button
            onClick={() => sendMessage(`Please explain ${activeTopic.title} in Hinglish, step-by-step with practical logic.`)}
            className="px-2 py-1 rounded-md bg-[#0d1117] hover:bg-[#21262d] text-[#e3b341] border border-[#e3b341]/30 hover:border-[#e3b341] transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer shrink-0"
          >
            <Globe2 className="w-3 h-3" />
            <span>Hinglish 🇮🇳</span>
          </button>

          <button
            onClick={() => sendMessage(`Please review my current code in the editor for ${activeTopic.practiceProblem.title}. Are there any bugs or missed invariants?`)}
            className="px-2 py-1 rounded-md bg-[#0d1117] hover:bg-[#21262d] text-[#3fb950] border border-[#3fb950]/30 hover:border-[#3fb950] transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer shrink-0"
          >
            <Bug className="w-3 h-3" />
            <span>Find My Mistake</span>
          </button>

          <button
            onClick={() => sendMessage(`Explain the time and space complexity of ${activeTopic.title}.`)}
            className="px-2 py-1 rounded-md bg-[#0d1117] hover:bg-[#21262d] text-[#bc8cff] border border-[#bc8cff]/30 hover:border-[#bc8cff] transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer shrink-0"
          >
            <Clock className="w-3 h-3" />
            <span>Complexity</span>
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-3 md:p-4 overflow-y-auto space-y-3.5 text-xs bg-[#161b22]">
        {/* Topic Context banner inside chat */}
        <div className="text-center">
          <span className="text-[10px] text-[#8b949e] font-mono bg-[#0d1117] border border-[#30363d] px-2.5 py-1 rounded-full">
            Context: {activeTopic.title} • {activeTopic.practiceProblem.title}
          </span>
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div 
              key={msg.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}
            >
              <div
                className={`p-3 rounded-xl max-w-[88%] text-xs leading-relaxed ${
                  isUser
                    ? 'bg-[#1c2128] border border-[#30363d] text-[#e6edf3] shadow-xs'
                    : 'bg-[#0d1117] border border-[#a371f7]/30 text-[#8b949e] shadow-xs'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-[#30363d]/50">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#a371f7]" />
                      <span className="text-[10px] font-bold text-[#a371f7] uppercase font-mono tracking-wider">
                        Gemini Tutor
                      </span>
                    </div>
                    {msg.hintLevel && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#e3b341]/20 text-[#e3b341] font-mono font-semibold">
                        Hint Lvl {msg.hintLevel}
                      </span>
                    )}
                  </div>
                )}

                <div className="whitespace-pre-line text-[#e6edf3] text-xs leading-relaxed">
                  {msg.text}
                </div>

                <div className="flex justify-end items-center gap-1 mt-1 text-[9px] text-[#8b949e]">
                  <span>{msg.timestamp}</span>
                  {isUser && <CheckCheck className="w-3 h-3 text-[#58a6ff]" />}
                </div>
              </div>
            </div>
          );
        })}

        {/* AI Typing indicator */}
        {isAiTyping && (
          <div className="flex justify-start">
            <div className="bg-[#0d1117] border border-[#a371f7]/30 p-2.5 rounded-xl text-xs text-[#a371f7] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span className="text-[11px] font-mono">Gemini is analyzing screen context...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested quick prompt chips */}
      <div className="px-3 pt-2 pb-1 bg-[#1c2128] border-t border-[#30363d] overflow-x-auto flex items-center gap-1.5 shrink-0 scrollbar-none">
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(chip.query)}
            className="text-[10px] text-[#8b949e] hover:text-[#e6edf3] bg-[#0d1117] border border-[#30363d] hover:border-[#a371f7] px-2 py-0.5 rounded-full whitespace-nowrap transition-colors cursor-pointer"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className="p-2.5 bg-[#1c2128] shrink-0">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            id="input-chat-message"
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask about ${activeTopic.title}, code, or complexity...`}
            className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] rounded-full pl-3.5 pr-10 py-2 text-xs placeholder-[#8b949e] focus:outline-none focus:border-[#a371f7] transition-colors"
          />
          <button
            id="btn-send-chat"
            type="submit"
            disabled={!inputVal.trim()}
            title="Send to Gemini"
            className="absolute right-1.5 text-[#a371f7] hover:text-[#b388ff] p-1.5 rounded-full hover:bg-[#161b22] disabled:opacity-30 transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
