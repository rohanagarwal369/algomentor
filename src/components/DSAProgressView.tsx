import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trophy, 
  Flame, 
  Target, 
  Code2, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Cpu, 
  HelpCircle,
  TrendingUp,
  Info
} from 'lucide-react';
import { DSATopic } from '../types';

interface DSAProgressViewProps {
  onNavigateToTopic?: (topicId: string) => void;
  onClose?: () => void;
}

export const DSAProgressView: React.FC<DSAProgressViewProps> = ({ 
  onNavigateToTopic,
  onClose 
}) => {
  const { dsaProgress, setActiveTopicId } = useApp();
  const [showTaxonomyBreakdown, setShowTaxonomyBreakdown] = useState(false);
  const [showCalculationDetails, setShowCalculationDetails] = useState(false);

  const {
    overallCompletion,
    topicsCompleted,
    totalTopics,
    problemsSolved,
    currentStreak,
    practiceAccuracy,
    majorCategories,
    detailedCategories,
    aiInsight
  } = dsaProgress;

  // Generate ASCII block progress bar (e.g. ████████░░ 80%)
  const renderBlockBar = (percent: number, totalBlocks = 10): string => {
    const filled = Math.min(totalBlocks, Math.max(0, Math.round((percent / 100) * totalBlocks)));
    const empty = totalBlocks - filled;
    return '█'.repeat(filled) + '░'.repeat(empty) + ` ${percent}%`;
  };

  const handleTopicJump = (topic: DSATopic) => {
    setActiveTopicId(topic.id);
    if (onNavigateToTopic) {
      onNavigateToTopic(topic.id);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div id="dsa-progress-section" className="space-y-5 text-[#e6edf3]">
      {/* ==================================================
          1. DSA PROGRESS & OVERALL COMPLETION
          ================================================== */}
      <div 
        id="card-dsa-overall-progress"
        className="p-4 sm:p-5 rounded-xl bg-[#0d1117] border border-[#30363d] relative overflow-hidden shadow-sm"
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-32 bg-[#58a6ff]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#58a6ff]">
                DSA Progress
              </span>
              <span className="text-[10px] font-mono text-[#8b949e] bg-[#161b22] px-2 py-0.5 rounded border border-[#30363d]">
                Journey Tracker
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#e6edf3] tracking-tight mt-1 flex items-baseline gap-2">
              <span>Overall Completion:</span>
              <span className="text-[#58a6ff]">{overallCompletion}%</span>
            </div>
          </div>

          {/* ASCII / Block representation indicator */}
          <div className="sm:text-right">
            <div 
              className="font-mono text-sm sm:text-base font-bold text-[#58a6ff] bg-[#161b22] px-3 py-1.5 rounded-lg border border-[#30363d] inline-block shadow-inner tracking-wider"
              title="Terminal Block Progress"
            >
              {renderBlockBar(overallCompletion, 10)}
            </div>
          </div>
        </div>

        {/* High-contrast smooth progress bar */}
        <div className="w-full bg-[#161b22] h-3 rounded-full overflow-hidden border border-[#30363d] p-0.5">
          <div 
            className="bg-gradient-to-r from-[#1f6feb] via-[#58a6ff] to-[#79b8ff] h-full rounded-full transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${Math.max(4, overallCompletion)}%` }}
          />
        </div>

        {/* Calculation transparency toggle & footer */}
        <div className="flex items-center justify-between mt-3 text-[11px] text-[#8b949e]">
          <span className="truncate">
            Real-time mastery evaluated from actual course activities
          </span>
          <button
            onClick={() => setShowCalculationDetails(prev => !prev)}
            className="flex items-center gap-1 hover:text-[#58a6ff] transition-colors cursor-pointer shrink-0 ml-2"
          >
            <Info className="w-3 h-3" />
            <span className="hidden sm:inline">
              {showCalculationDetails ? 'Hide calculation' : 'How is this calculated?'}
            </span>
          </button>
        </div>

        {showCalculationDetails && (
          <div className="mt-3 p-3 bg-[#161b22] border border-[#30363d] rounded-lg text-xs space-y-1.5 animate-in fade-in duration-150">
            <div className="font-semibold text-[#e6edf3] flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>Transparent Progress Calculation (Prototype 1)</span>
            </div>
            <p className="text-[#8b949e] leading-relaxed">
              Overall DSA Progress is computed strictly from your verified learning activity:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
              <div className="p-2 rounded bg-[#0d1117] border border-[#30363d]/60">
                <span className="text-[#8b949e] block">Topics (45%)</span>
                <span className="text-[#e6edf3] font-bold">{topicsCompleted}/{totalTopics} mastered</span>
              </div>
              <div className="p-2 rounded bg-[#0d1117] border border-[#30363d]/60">
                <span className="text-[#8b949e] block">Problems (35%)</span>
                <span className="text-[#e6edf3] font-bold">{problemsSolved} solved</span>
              </div>
              <div className="p-2 rounded bg-[#0d1117] border border-[#30363d]/60">
                <span className="text-[#8b949e] block">Accuracy (20%)</span>
                <span className="text-[#e6edf3] font-bold">{practiceAccuracy}% success</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==================================================
          2. KEY METRICS: Topics / Problems / Accuracy / Streak
          ================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1: Topics Completed */}
        <div className="p-3.5 rounded-xl bg-[#0d1117] border border-[#30363d] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8b949e]">
            <span className="text-xs font-medium">Topics Completed</span>
            <BookOpen className="w-4 h-4 text-[#58a6ff]" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-mono text-[#e6edf3]">
              {topicsCompleted} <span className="text-sm font-normal text-[#8b949e]">/ {totalTopics}</span>
            </div>
            <div className="text-[11px] text-[#8b949e] mt-0.5">
              {totalTopics - topicsCompleted === 0 ? 'All topics mastered' : `${totalTopics - topicsCompleted} topics remaining`}
            </div>
          </div>
        </div>

        {/* Metric 2: Problems Solved */}
        <div className="p-3.5 rounded-xl bg-[#0d1117] border border-[#30363d] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8b949e]">
            <span className="text-xs font-medium">Problems Solved</span>
            <Code2 className="w-4 h-4 text-[#3fb950]" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-mono text-[#3fb950]">
              {problemsSolved}
            </div>
            <div className="text-[11px] text-[#8b949e] mt-0.5">
              Code judge verified
            </div>
          </div>
        </div>

        {/* Metric 3: Current Streak */}
        <div className="p-3.5 rounded-xl bg-[#0d1117] border border-[#30363d] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8b949e]">
            <span className="text-xs font-medium">Current Streak</span>
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-mono text-orange-400 flex items-center gap-1">
              <span>🔥 {currentStreak}</span>
              <span className="text-sm font-normal text-[#8b949e]">Days</span>
            </div>
            <div className="text-[11px] text-[#8b949e] mt-0.5">
              Daily study consistency
            </div>
          </div>
        </div>

        {/* Metric 4: Practice Accuracy */}
        <div className="p-3.5 rounded-xl bg-[#0d1117] border border-[#30363d] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8b949e]">
            <span className="text-xs font-medium">Practice Accuracy</span>
            <Target className="w-4 h-4 text-[#bc8cff]" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold font-mono text-[#bc8cff]">
              {practiceAccuracy > 0 ? `${practiceAccuracy}%` : 'N/A'}
            </div>
            <div className="text-[11px] text-[#8b949e] mt-0.5">
              Quiz & test pass rate
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          3. DSA CATEGORY BREAKDOWN
          ================================================== */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8b949e]">
              DSA Category Breakdown
            </h3>
            <p className="text-[11px] text-[#8b949e]">
              Progress across major DSA domains rather than individual chapters
            </p>
          </div>

          <button
            onClick={() => setShowTaxonomyBreakdown(prev => !prev)}
            className="text-[11px] text-[#58a6ff] hover:underline cursor-pointer"
          >
            {showTaxonomyBreakdown ? 'Show Major Categories' : 'View Sub-categories'}
          </button>
        </div>

        {/* Primary View: Major Categories (Data Structures, Algorithms, Problem Solving) */}
        {!showTaxonomyBreakdown ? (
          <div className="space-y-2.5">
            {/* Category 1: Data Structures */}
            <div className="p-3.5 bg-[#0d1117] rounded-xl border border-[#30363d] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-[#58a6ff]/10 text-[#58a6ff]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#e6edf3]">Data Structures</span>
                    <span className="text-[10px] text-[#8b949e] block">
                      Arrays, Linked Lists, Stacks, Queues, Trees, Graphs
                    </span>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs font-bold text-[#58a6ff]">
                    {renderBlockBar(majorCategories.dataStructures.percent, 10)}
                  </span>
                  <span className="text-[10px] text-[#8b949e] block">
                    {majorCategories.dataStructures.completed} / {majorCategories.dataStructures.total} topics
                  </span>
                </div>
              </div>

              <div className="w-full bg-[#161b22] h-2 rounded-full overflow-hidden border border-[#30363d]/60">
                <div 
                  className="bg-[#58a6ff] h-full rounded-full transition-all duration-500"
                  style={{ width: `${majorCategories.dataStructures.percent}%` }}
                />
              </div>
            </div>

            {/* Category 2: Algorithms */}
            <div className="p-3.5 bg-[#0d1117] rounded-xl border border-[#30363d] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-[#bc8cff]/10 text-[#bc8cff]">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#e6edf3]">Algorithms</span>
                    <span className="text-[10px] text-[#8b949e] block">
                      Sorting, Searching, Dynamic Programming
                    </span>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs font-bold text-[#bc8cff]">
                    {renderBlockBar(majorCategories.algorithms.percent, 10)}
                  </span>
                  <span className="text-[10px] text-[#8b949e] block">
                    {majorCategories.algorithms.completed} / {majorCategories.algorithms.total} topics
                  </span>
                </div>
              </div>

              <div className="w-full bg-[#161b22] h-2 rounded-full overflow-hidden border border-[#30363d]/60">
                <div 
                  className="bg-[#bc8cff] h-full rounded-full transition-all duration-500"
                  style={{ width: `${majorCategories.algorithms.percent}%` }}
                />
              </div>
            </div>

            {/* Category 3: Problem Solving */}
            <div className="p-3.5 bg-[#0d1117] rounded-xl border border-[#30363d] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-[#3fb950]/10 text-[#3fb950]">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#e6edf3]">Problem Solving</span>
                    <span className="text-[10px] text-[#8b949e] block">
                      Hands-on code challenges & judge verified implementations
                    </span>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs font-bold text-[#3fb950]">
                    {renderBlockBar(majorCategories.problemSolving.percent, 10)}
                  </span>
                  <span className="text-[10px] text-[#8b949e] block">
                    {majorCategories.problemSolving.completed} / {majorCategories.problemSolving.total} problems verified
                  </span>
                </div>
              </div>

              <div className="w-full bg-[#161b22] h-2 rounded-full overflow-hidden border border-[#30363d]/60">
                <div 
                  className="bg-[#3fb950] h-full rounded-full transition-all duration-500"
                  style={{ width: `${majorCategories.problemSolving.percent}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Secondary Detailed Taxonomy breakdown */
          <div className="space-y-2">
            {detailedCategories.map(cat => (
              <div key={cat.id} className="p-3 bg-[#0d1117] rounded-lg border border-[#30363d] flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#e6edf3]">{cat.name}</span>
                  <span className="font-mono text-[#8b949e] text-[11px]">
                    {cat.completed}/{cat.total} topics ({cat.percent}%)
                  </span>
                </div>
                <div className="w-full bg-[#161b22] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#58a6ff] h-full rounded-full"
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==================================================
          4. AI LEARNING INSIGHTS
          ================================================== */}
      <div 
        id="card-ai-learning-insight"
        className="p-4 rounded-xl bg-gradient-to-r from-[#161b22] to-[#1c2128] border border-[#a371f7]/40 shadow-sm relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#a371f7]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#a371f7]">
              AI Learning Insight
            </h4>
          </div>
          <span className="text-[10px] text-[#8b949e] font-mono bg-[#0d1117] px-2 py-0.5 rounded border border-[#30363d]">
            Grounded in actual progress
          </span>
        </div>

        {/* Insight text */}
        <p className="text-xs sm:text-sm text-[#e6edf3] leading-relaxed font-sans mt-1">
          {aiInsight.text}
        </p>

        {/* Recommended action CTA button if topic is suggested */}
        {aiInsight.recommendedTopic && (
          <div className="mt-3 pt-3 border-t border-[#30363d]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="text-[11px] text-[#8b949e]">
              <span className="text-[#e3b341] font-semibold">Recommended target: </span>
              <span>{aiInsight.recommendedTopic.title} ({aiInsight.recommendedTopic.practiceProblem.title})</span>
            </div>

            <button
              onClick={() => handleTopicJump(aiInsight.recommendedTopic!)}
              className="px-3.5 py-1.5 bg-[#a371f7] hover:bg-[#b388ff] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              <span>Practice {aiInsight.recommendedTopic.title} Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
