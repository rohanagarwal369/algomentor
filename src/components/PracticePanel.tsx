import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Play, 
  Send, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  ChevronDown, 
  Sparkles,
  Check,
  Cpu,
  Copy
} from 'lucide-react';

export const PracticePanel: React.FC = () => {
  const { 
    activeTopic, 
    selectedLanguage, 
    setSelectedLanguage, 
    currentCode, 
    setCurrentCode, 
    resetCode, 
    isRunningCode, 
    testResult, 
    runCode, 
    submitCode,
    sendMessage,
    setActiveRightTab
  } = useApp();

  const problem = activeTopic.practiceProblem;
  const [activeSubTab, setActiveSubTab] = useState<'problem' | 'editor' | 'result'>('editor');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentCode);
      } else {
        throw new Error('Clipboard API unavailable');
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for iframe / unsupported clipboard contexts
      try {
        const textArea = document.createElement('textarea');
        textArea.value = currentCode;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy solution:', err);
      }
    }
  };

  // Compute line numbers
  const lines = currentCode.split('\n');
  const lineNumbers = Array.from({ length: Math.max(lines.length, 12) }, (_, i) => i + 1);

  const getLanguageFileName = (lang: string) => {
    switch (lang) {
      case 'javascript': return 'solution.js';
      case 'python': return 'solution.py';
      case 'cpp': return 'solution.cpp';
      case 'java': return 'Solution.java';
      default: return 'solution.js';
    }
  };

  const handleAskGeminiForHint = () => {
    setActiveRightTab('chat');
    sendMessage(`Can you give me a hint for solving "${problem.title}" without writing the full solution?`);
  };

  return (
    <div id="practice-panel" className="flex flex-col h-full bg-[#161b22] overflow-hidden">
      {/* Practice Header with Difficulty badge */}
      <div className="px-4 py-2.5 border-b border-[#30363d] flex items-center justify-between bg-[#1c2128] shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#8b949e] truncate">
            Practice: {problem.title}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleAskGeminiForHint}
            title="Ask AI for a hint"
            className="flex items-center gap-1 text-[11px] text-[#a371f7] hover:text-[#b388ff] px-2 py-0.5 rounded hover:bg-[#0d1117] transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">Hint</span>
          </button>

          <span 
            className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${
              problem.difficulty === 'Easy' ? 'bg-[#3fb950]/20 text-[#3fb950] border-[#3fb950]' :
              problem.difficulty === 'Medium' ? 'bg-[#e3b341]/20 text-[#e3b341] border-[#e3b341]' :
              'bg-[#f85149]/20 text-[#f85149] border-[#f85149]'
            }`}
          >
            {problem.difficulty.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Main scrollable body */}
      <div className="flex-1 p-3 md:p-4 text-xs overflow-y-auto bg-[#0d1117] space-y-3">
        {/* Problem Statement Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 text-[#e6edf3]">
          <p className="text-[#8b949e] mb-2 leading-relaxed">
            {problem.description}
          </p>

          <div className="space-y-1.5 font-mono text-[11px] bg-[#0d1117] p-2.5 rounded border border-[#30363d]/60">
            <div>
              <span className="text-[#8b949e]">Input: </span>
              <span className="text-[#e6edf3]">{problem.exampleInput}</span>
            </div>
            <div>
              <span className="text-[#8b949e]">Output: </span>
              <span className="text-[#3fb950] font-semibold">{problem.exampleOutput}</span>
            </div>
          </div>
        </div>

        {/* Code Editor Area (VS Code / Monaco styling) */}
        <div className="flex flex-col border border-[#30363d] rounded-lg bg-[#161b22] overflow-hidden shadow-sm">
          {/* Editor window header */}
          <div className="flex items-center justify-between bg-[#1c2128] px-3 py-1.5 border-b border-[#30363d] text-[11px] text-[#8b949e]">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 mr-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f85149] opacity-70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#e3b341] opacity-70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#3fb950] opacity-70"></span>
              </div>

              {/* Language label (defaults to "javascript", updates with selected language) */}
              <span 
                id="editor-language-label"
                className="font-mono text-[11px] font-semibold text-[#58a6ff] bg-[#0d1117] px-2 py-0.5 rounded border border-[#30363d] transition-colors"
                title="Active language"
              >
                {selectedLanguage === 'cpp' ? 'c++' : selectedLanguage}
              </span>

              {/* Language Selector Dropdown right next to the language label */}
              <div className="relative inline-flex items-center">
                <select
                  id="select-code-language"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as any)}
                  className="bg-[#0d1117] hover:bg-[#21262d] focus:bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff]/50 focus:border-[#58a6ff] text-[#e6edf3] text-[11px] font-mono rounded px-2.5 py-0.5 pr-6 appearance-none focus:outline-none cursor-pointer transition-colors"
                  aria-label="Select programming language"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
                <ChevronDown className="w-3 h-3 text-[#8b949e] absolute right-1.5 pointer-events-none" />
              </div>

              {/* Associated filename */}
              <span className="font-mono text-[#8b949e] text-[11px] hidden sm:inline ml-0.5">
                {getLanguageFileName(selectedLanguage)}
              </span>
            </div>

            {/* Toolbar controls: Copy Solution & Reset */}
            <div className="flex items-center gap-1.5">
              {/* One-click Copy Solution Button */}
              <button
                id="btn-copy-solution"
                onClick={handleCopyCode}
                title={copied ? "Copied to clipboard!" : "Copy solution to clipboard"}
                className={`flex items-center gap-1 px-2 py-0.5 rounded border transition-all duration-150 cursor-pointer text-[11px] font-mono ${
                  copied
                    ? 'bg-[#3fb950]/15 text-[#3fb950] border-[#3fb950]/40 font-semibold'
                    : 'bg-[#0d1117] hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] border-[#30363d]'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-[#3fb950]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                id="btn-reset-code"
                onClick={resetCode}
                title="Reset to template"
                className="p-1 hover:bg-[#0d1117] text-[#8b949e] hover:text-[#e6edf3] rounded transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Interactive Monaco-style Textarea with Line Numbers */}
          <div className="flex font-mono text-[11px] bg-[#0d1117] h-48 overflow-auto relative">
            {/* Line numbers gutter */}
            <div className="py-2.5 px-2 select-none text-[#8b949e]/40 text-right bg-[#0d1117] border-r border-[#30363d]/40 shrink-0 font-mono text-[11px]">
              {lineNumbers.map((num) => (
                <div key={num} className="leading-5 h-5 px-1">{num}</div>
              ))}
            </div>

            {/* Code textarea */}
            <textarea
              id="editor-code-textarea"
              value={currentCode}
              onChange={(e) => setCurrentCode(e.target.value)}
              spellCheck={false}
              className="flex-1 py-2.5 px-3 bg-transparent text-[#e6edf3] focus:outline-none resize-none font-mono text-[11px] leading-5 whitespace-pre overflow-x-auto selection:bg-[#58a6ff]/30"
            />
          </div>
        </div>

        {/* Verdict / Results Card */}
        {testResult.status !== 'idle' && (
          <div 
            id="verdict-result-card"
            className={`border rounded-lg p-3 transition-all duration-200 ${
              testResult.status === 'running' ? 'bg-[#161b22] border-[#30363d]' :
              testResult.status === 'accepted' ? 'bg-[#3fb950]/5 border-[#3fb950]' :
              'bg-[#f85149]/5 border-[#f85149]'
            }`}
          >
            {testResult.status === 'running' ? (
              <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                <Loader2 className="w-4 h-4 animate-spin text-[#58a6ff]" />
                <span>Running test cases in sandbox judge...</span>
              </div>
            ) : testResult.status === 'accepted' ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-[#3fb950] font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Accepted</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#3fb950] bg-[#3fb950]/15 px-2 py-0.5 rounded border border-[#3fb950]/30 font-semibold">
                    {testResult.testsPassed}
                  </span>
                </div>

                {testResult.runtime && (
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-2 text-[#8b949e]">
                    <div className="bg-[#161b22] p-1.5 rounded border border-[#30363d]">
                      <span className="block text-[9px] uppercase text-[#8b949e]">Runtime</span>
                      <span className="text-[#e6edf3] font-semibold">{testResult.runtime}</span>
                    </div>
                    <div className="bg-[#161b22] p-1.5 rounded border border-[#30363d]">
                      <span className="block text-[9px] uppercase text-[#8b949e]">Memory</span>
                      <span className="text-[#e6edf3] font-semibold">{testResult.memory}</span>
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-[#8b949e] leading-relaxed">
                  {testResult.message}
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-[#f85149] font-bold text-xs mb-1">
                  <XCircle className="w-4 h-4" />
                  <span>Wrong Answer</span>
                </div>
                <p className="text-[11px] text-[#8b949e]">
                  {testResult.message || 'Output did not match expected solution for test case #4.'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Editor Action buttons footer */}
      <div className="p-3 bg-[#161b22] border-t border-[#30363d] flex items-center justify-between shrink-0">
        <span className="text-[11px] text-[#8b949e] font-mono">
          {selectedLanguage}
        </span>

        <div className="flex items-center gap-2">
          <button
            id="btn-run-code"
            onClick={runCode}
            disabled={isRunningCode}
            className="px-3 py-1.5 border border-[#30363d] hover:border-[#8b949e] hover:bg-[#1c2128] text-[#8b949e] hover:text-[#e6edf3] rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Run</span>
          </button>

          <button
            id="btn-submit-code"
            onClick={submitCode}
            disabled={isRunningCode}
            className="px-3.5 py-1.5 bg-[#3fb950] hover:bg-[#2ea043] text-[#0d1117] font-bold rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
          >
            {isRunningCode ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
