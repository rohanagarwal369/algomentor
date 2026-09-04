import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SupportedLanguage } from '../types';
import { Terminal, Check, ArrowRight, Sparkles, Code2 } from 'lucide-react';

interface LanguageOption {
  id: SupportedLanguage;
  name: string;
  badge: string;
  tag: string;
  description: string;
  snippet: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    badge: 'JS',
    tag: 'Web & Full-Stack Standard',
    description: 'Dynamic prototypes, modern ES6+ syntax, and native web interoperability.',
    snippet: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) return [map.get(diff), i];
    map.set(nums[i], i);
  }
}`
  },
  {
    id: 'python',
    name: 'Python',
    badge: 'PY',
    tag: 'Most Popular for Interviews',
    description: 'Concise, expressive, and high-velocity algorithmic problem solving.',
    snippet: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i`
  },
  {
    id: 'java',
    name: 'Java',
    badge: 'JAVA',
    tag: 'Enterprise & Strong Typing',
    description: 'Strict object-oriented contracts, rich Collections framework, and type safety.',
    snippet: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int diff = target - nums[i];
        if (map.containsKey(diff)) return new int[]{map.get(diff), i};
        map.put(nums[i], i);
    }
    return new int[]{};
}`
  },
  {
    id: 'cpp',
    name: 'C++',
    badge: 'C++',
    tag: 'Competitive Programming & Speed',
    description: 'Ultra-fast memory layout, zero-overhead abstractions, and standard STL algorithms.',
    snippet: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); ++i) {
        int diff = target - nums[i];
        if (map.count(diff)) return {map[diff], i};
        map[nums[i]] = i;
    }
    return {};
}`
  }
];

export const OnboardingPage: React.FC = () => {
  const { selectedLanguage, setSelectedLanguage, user } = useApp();
  const navigate = useNavigate();
  const [chosenLang, setChosenLang] = useState<SupportedLanguage>(selectedLanguage || 'javascript');
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = () => {
    setSubmitting(true);
    setSelectedLanguage(chosenLang);
    localStorage.setItem('algomentor_has_onboarded', 'true');
    setTimeout(() => {
      navigate('/');
    }, 250);
  };

  return (
    <div className="min-h-screen w-full bg-[#0d1117] text-[#e6edf3] flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-[#58a6ff]/30">
      {/* Background glowing gradient */}
      <div className="absolute top-1/4 w-96 h-96 bg-[#58a6ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c2128] border border-[#30363d] mb-4">
            <Terminal className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span className="text-xs font-semibold text-[#e6edf3]">AlgoMentor Setup</span>
            <span className="text-[#8b949e] text-xs">•</span>
            <span className="text-xs text-[#58a6ff] font-medium">Step 2 of 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#e6edf3]">
            Choose your preferred language
          </h1>
          <p className="text-xs sm:text-sm text-[#8b949e] max-w-xl mx-auto mt-2 leading-relaxed">
            Welcome, {user?.name || 'Developer'}! Select your primary programming language for code examples, practice templates, and AI guidance. You can change this at any time in Settings.
          </p>
        </div>

        {/* 4 Selectable Cards in Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {LANGUAGE_OPTIONS.map((option) => {
            const isSelected = chosenLang === option.id;
            return (
              <button
                key={option.id}
                id={`onboarding-card-${option.id}`}
                type="button"
                onClick={() => setChosenLang(option.id)}
                className={`relative text-left p-5 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[#161b22] border-[#58a6ff] shadow-lg shadow-[#58a6ff]/10 ring-1 ring-[#58a6ff]/50'
                    : 'bg-[#161b22]/70 border-[#30363d] hover:border-[#8b949e]/50 hover:bg-[#161b22]'
                }`}
              >
                {/* Header of card */}
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                        isSelected 
                          ? 'bg-[#58a6ff] text-[#0d1117] shadow-sm' 
                          : 'bg-[#21262d] text-[#8b949e] border border-[#30363d] group-hover:text-[#e6edf3]'
                      }`}>
                        {option.badge}
                      </span>
                      <div>
                        <h2 className="text-sm font-bold text-[#e6edf3] flex items-center gap-1.5">
                          {option.name}
                        </h2>
                        <p className="text-[11px] text-[#58a6ff] font-medium">
                          {option.tag}
                        </p>
                      </div>
                    </div>

                    {/* Radio Indicator */}
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                      isSelected 
                        ? 'bg-[#58a6ff] text-[#0d1117]' 
                        : 'border border-[#30363d] bg-[#0d1117]'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <p className="text-xs text-[#8b949e] mb-3 leading-relaxed">
                    {option.description}
                  </p>
                </div>

                {/* Code preview snippet */}
                <div className="mt-2 pt-2 border-t border-[#30363d]/60 font-mono text-[10px] text-[#8b949e] bg-[#0d1117]/80 rounded p-2.5 overflow-x-auto">
                  <pre className="text-[#a5d6ff]/90 leading-normal">
                    <code>{option.snippet}</code>
                  </pre>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#161b22] border border-[#30363d] rounded-xl">
          <div className="flex items-center gap-2 text-xs text-[#8b949e]">
            <Sparkles className="w-4 h-4 text-[#58a6ff] shrink-0" />
            <span>
              Currently selected: <span className="text-[#58a6ff] font-semibold">{LANGUAGE_OPTIONS.find(l => l.id === chosenLang)?.name}</span>. Applies across Notes, Practice Editor, and AI Tutor.
            </span>
          </div>

          <button
            id="btn-confirm-language"
            type="button"
            disabled={submitting}
            onClick={handleConfirm}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#58a6ff] hover:bg-[#388bfd] text-[#0d1117] font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
          >
            <span>Confirm & Launch Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
