import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SupportedLanguage } from '../types';
import { 
  Code2, 
  Copy, 
  Check, 
  Sparkles, 
  Lightbulb, 
  ArrowRight,
  Activity,
  BarChart3,
  HelpCircle,
  PlayCircle
} from 'lucide-react';
import { DSAVisualizer } from './visualizer/DSAVisualizer';
import { ComplexityVisualizer } from './ComplexityVisualizer';
import { QuizSection } from './QuizSection';

export const NotesView: React.FC = () => {
  const { 
    activeTopic, 
    setActiveRightTab, 
    sendMessage,
    selectedLanguage,
    setSelectedLanguage,
    contentLanguage,
    setContentLanguage
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [activeStage, setActiveStage] = useState<'all' | 'visualizer' | 'complexity' | 'quiz'>('all');

  const currentContent = useMemo(() => {
    if (contentLanguage === 'hinglish' && activeTopic.notesContent?.hinglish) {
      return activeTopic.notesContent.hinglish;
    }
    if (activeTopic.notesContent?.en) {
      return activeTopic.notesContent.en;
    }
    return {
      shortDescription: activeTopic.shortDescription,
      overview: activeTopic.overview,
      keyConcept: activeTopic.keyConcept,
      complexityNotes: activeTopic.complexity.notes
    };
  }, [activeTopic, contentLanguage]);

  const visualizerRef = useRef<HTMLDivElement>(null);
  const complexityRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTopic.id]);

  const getTopicFileName = (topicId: string, lang: SupportedLanguage) => {
    const ext = lang === 'javascript' ? 'js' : lang === 'python' ? 'py' : lang === 'java' ? 'java' : 'cpp';
    const nameMap: Record<string, string> = {
      'linked-list': lang === 'java' ? 'SinglyLinkedList' : 'singlyLinkedList',
      'arrays': lang === 'java' ? 'TwoSumSorted' : 'twoSumSorted',
      'stacks': lang === 'java' ? 'ValidParentheses' : 'validParentheses',
      'queues': lang === 'java' ? 'MyCircularQueue' : 'circularQueue',
      'trees': lang === 'java' ? 'ValidateBST' : 'validateBst',
      'graphs': lang === 'java' ? 'Dijkstra' : 'dijkstra',
      'dynamic-programming': lang === 'java' ? 'CoinChange' : 'coinChange',
      'sorting': lang === 'java' ? 'MergeSort' : 'mergeSort',
      'searching': lang === 'java' ? 'BinarySearch' : 'binarySearch',
    };
    const base = nameMap[topicId] || topicId.replace(/-/g, '_');
    return `${base}.${ext}`;
  };

  const activeCodeSnippet = (activeTopic.codeExample && (
    activeTopic.codeExample[selectedLanguage] || 
    activeTopic.codeExample.javascript || 
    (activeTopic.codeExample as any).code
  )) || '';

  const handleCopyCode = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(activeCodeSnippet);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = activeCodeSnippet;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAskAiAboutNotes = () => {
    setActiveRightTab('chat');
    sendMessage(`Could you give me an intuitive real-world analogy and walk through the mechanics of ${activeTopic.title}?`);
  };

  const handleStartPractice = () => {
    setActiveRightTab('practice');
    const practicePanel = document.getElementById('practice-panel');
    if (practicePanel) {
      practicePanel.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>, stage: 'all' | 'visualizer' | 'complexity' | 'quiz') => {
    setActiveStage(stage);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0d1117] overflow-hidden min-w-0">
      {/* Scrollable notes body */}
      <div ref={scrollContainerRef} className="flex-1 p-4 md:p-7 overflow-y-auto max-w-4xl mx-auto w-full space-y-6">
        {/* Breadcrumb & quick actions */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2 text-[#8b949e]">
            <span>DSA Curriculum</span>
            <span>/</span>
            <span className="text-[#8b949e]">{activeTopic.category}</span>
            <span>/</span>
            <span className="text-[#58a6ff] font-medium">{activeTopic.title}</span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Content Language Pill Toggle (English / Hinglish) */}
            <div 
              id="notes-content-language-toggle"
              className="inline-flex items-center bg-[#161b22] p-0.5 rounded-full border border-[#30363d]"
              role="group"
              aria-label="Notes language toggle"
            >
              <button
                type="button"
                id="notes-toggle-en"
                onClick={() => setContentLanguage('en')}
                title="Switch notes to English"
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  contentLanguage === 'en'
                    ? 'bg-[#58a6ff] text-[#0d1117] shadow-xs'
                    : 'text-[#8b949e] hover:text-[#e6edf3]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                id="notes-toggle-hinglish"
                onClick={() => setContentLanguage('hinglish')}
                title="Switch notes to Hinglish (Latin script)"
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  contentLanguage === 'hinglish'
                    ? 'bg-[#58a6ff] text-[#0d1117] shadow-xs'
                    : 'text-[#8b949e] hover:text-[#e6edf3]'
                }`}
              >
                Hinglish
              </button>
            </div>

            <button
              onClick={handleAskAiAboutNotes}
              className="flex items-center gap-1.5 text-xs text-[#a371f7] hover:text-[#b388ff] bg-[#161b22] border border-[#a371f7]/30 hover:border-[#a371f7] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Explain with Gemini</span>
            </button>
          </div>
        </div>

        {/* Title & badge */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#e6edf3] mb-1.5">
              Understanding {activeTopic.title}
            </h1>
            <p className="text-sm text-[#8b949e]">
              {currentContent.shortDescription}
            </p>
          </div>

          <span 
            className={`shrink-0 text-xs px-2.5 py-1 rounded-md font-semibold border ${
              activeTopic.difficulty === 'Easy' ? 'bg-[#3fb950]/10 text-[#3fb950] border-[#3fb950]/40' :
              activeTopic.difficulty === 'Medium' ? 'bg-[#e3b341]/10 text-[#e3b341] border-[#e3b341]/40' :
              'bg-[#f85149]/10 text-[#f85149] border-[#f85149]/40'
            }`}
          >
            {activeTopic.difficulty}
          </span>
        </div>

        {/* Structured Learning Journey Bar */}
        <div className="flex items-center gap-1 bg-[#161b22] p-1.5 rounded-xl border border-[#30363d] overflow-x-auto text-xs">
          <button
            onClick={() => setActiveStage('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
              activeStage === 'all' ? 'bg-[#21262d] text-[#e6edf3]' : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            1. Overview
          </button>

          <button
            onClick={() => scrollToSection(visualizerRef, 'visualizer')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
              activeStage === 'visualizer' ? 'bg-[#58a6ff]/20 text-[#58a6ff]' : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span>2. Visualizer</span>
          </button>

          <button
            onClick={() => scrollToSection(complexityRef, 'complexity')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
              activeStage === 'complexity' ? 'bg-[#e3b341]/20 text-[#e3b341]' : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#e3b341]" />
            <span>3. Complexity</span>
          </button>

          <button
            onClick={() => scrollToSection(quizRef, 'quiz')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
              activeStage === 'quiz' ? 'bg-[#bc8cff]/20 text-[#bc8cff]' : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#bc8cff]" />
            <span>4. Quick Quiz</span>
          </button>

          <button
            onClick={handleStartPractice}
            className="ml-auto px-3 py-1.5 rounded-lg font-semibold bg-[#3fb950]/15 text-[#3fb950] hover:bg-[#3fb950]/25 transition-colors flex items-center gap-1 shrink-0"
          >
            <span>5. Practice Problem</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* 1. Main DSA Explanation Text */}
        <div className="space-y-4 text-sm text-[#8b949e] leading-relaxed">
          {currentContent.overview.map((paragraph, index) => (
            <p key={index} className="text-[#8b949e] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* 2. Interactive DSA Visualization Container */}
        <div ref={visualizerRef} id="dsa-visualizer-section">
          <DSAVisualizer config={activeTopic.visualizer} topicTitle={activeTopic.title} />
        </div>

        {/* Key Concept Callout Box */}
        <div className="bg-[#1c2128] border-l-4 border-[#e3b341] p-4 rounded-r shadow-xs">
          <div className="flex items-center gap-2 mb-1.5">
            <Lightbulb className="w-4 h-4 text-[#e3b341]" />
            <p className="text-xs text-[#e3b341] font-bold uppercase tracking-wider">
              {currentContent.keyConcept.title}
            </p>
          </div>
          <p className="text-xs text-[#e6edf3] leading-relaxed">
            {currentContent.keyConcept.description}
          </p>
        </div>

        {/* 3. Embedded Code Example with VS Code Dark Styling */}
        <div ref={codeRef} className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden shadow-md">
          <div className="flex flex-wrap justify-between items-center gap-2 px-4 py-2.5 border-b border-[#30363d] bg-[#1c2128]">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#58a6ff]" />
              <span className="text-xs font-mono text-[#e6edf3]">
                {getTopicFileName(activeTopic.id, selectedLanguage)}
              </span>
              <div className="flex items-center gap-1.5 ml-2">
                <select
                  aria-label="Code example language"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as SupportedLanguage)}
                  className="bg-[#0d1117] text-xs font-mono text-[#58a6ff] px-2 py-0.5 rounded border border-[#30363d] focus:outline-none focus:border-[#58a6ff] cursor-pointer"
                >
                  <option value="javascript" className="bg-[#161b22] text-[#e6edf3]">JavaScript</option>
                  <option value="python" className="bg-[#161b22] text-[#e6edf3]">Python</option>
                  <option value="java" className="bg-[#161b22] text-[#e6edf3]">Java</option>
                  <option value="cpp" className="bg-[#161b22] text-[#e6edf3]">C++</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-wider text-[#58a6ff] uppercase font-mono px-1.5 py-0.5 rounded bg-[#0d1117] border border-[#30363d]">
                Reference
              </span>
              <button
                onClick={handleCopyCode}
                title="Copy code snippet"
                className="flex items-center gap-1 text-[11px] text-[#8b949e] hover:text-[#e6edf3] px-2 py-1 rounded hover:bg-[#0d1117] border border-[#30363d] transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#3fb950]" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="font-mono">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 font-mono text-xs overflow-x-auto text-[#e6edf3] leading-relaxed bg-[#0d1117]/60">
            <pre className="selection:bg-[#58a6ff]/30">
              <code>{activeCodeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* 4. Complexity & Scalability Visualizer */}
        <div ref={complexityRef} id="dsa-complexity-section">
          <ComplexityVisualizer
            timeComplexity={activeTopic.complexity.time}
            spaceComplexity={activeTopic.complexity.space}
            notes={currentContent.complexityNotes || activeTopic.complexity.notes}
            complexityDetail={activeTopic.complexityDetail}
            topicTitle={activeTopic.title}
          />
        </div>

        {/* 5. Concept Check Mini Quiz */}
        <div ref={quizRef} id="dsa-quiz-section">
          <QuizSection
            topicId={activeTopic.id}
            topicTitle={activeTopic.title}
            questions={activeTopic.quiz}
          />
        </div>

        {/* Bottom Practice Prompt Banner */}
        <div className="bg-gradient-to-r from-[#161b22] to-[#1c2128] border border-[#30363d] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#3fb950] block mb-1">
              Ready to code?
            </span>
            <h4 className="text-base font-semibold text-[#e6edf3]">
              Solve Challenge: {activeTopic.practiceProblem.title}
            </h4>
            <p className="text-xs text-[#8b949e] mt-0.5">
              Implement your solution in the browser editor and verify against test cases.
            </p>
          </div>

          <button
            onClick={handleStartPractice}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#3fb950] text-[#0d1117] font-semibold text-xs hover:bg-[#4ac261] transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
          >
            <span>Open Problem Editor</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
