import React, { useState } from 'react';
import { ComplexityComparison } from '../types';
import { Clock, HardDrive, BarChart3, HelpCircle, ArrowRight, Zap } from 'lucide-react';

interface ComplexityVisualizerProps {
  timeComplexity: string;
  spaceComplexity: string;
  notes?: string;
  complexityDetail?: ComplexityComparison;
  topicTitle: string;
}

export const ComplexityVisualizer: React.FC<ComplexityVisualizerProps> = ({
  timeComplexity,
  spaceComplexity,
  notes,
  complexityDetail,
  topicTitle
}) => {
  const [inputSize, setInputSize] = useState<number>(1000); // 10, 100, 1000, 10000

  // Calculate operation counts for the selected input size
  const getOpCounts = (n: number) => {
    const o1 = 1;
    const oLogN = Math.round(Math.log2(n));
    const oN = n;
    const oNLogN = Math.round(n * Math.log2(n));
    const oN2 = n * n;
    return { o1, oLogN, oN, oNLogN, oN2 };
  };

  const ops = getOpCounts(inputSize);

  // Determine current topic tier
  const isO1 = timeComplexity.toLowerCase().includes('o(1)');
  const isLogN = timeComplexity.toLowerCase().includes('o(log n)');
  const isON = timeComplexity.toLowerCase().includes('o(n)') && !timeComplexity.toLowerCase().includes('o(n log n)') && !timeComplexity.toLowerCase().includes('o(n^2)');
  const isONLogN = timeComplexity.toLowerCase().includes('o(n log n)');

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1c2128] border-b border-[#30363d]">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#e3b341]" />
          <h3 className="text-sm font-semibold text-[#e6edf3]">Complexity & Scalability Visualizer</h3>
        </div>
        <span className="text-[11px] text-[#8b949e] font-mono">Big-O Analysis</span>
      </div>

      <div className="p-5 flex flex-col gap-6">
        {/* Top Badges: Time & Space Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-lg bg-[#0d1117] border border-[#30363d] flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-[#8b949e]">
                <Clock className="w-3.5 h-3.5 text-[#58a6ff]" />
                <span className="font-semibold uppercase tracking-wider text-[10px]">Time Complexity</span>
              </span>
              <span className="text-xs font-bold text-[#58a6ff] font-mono">{timeComplexity}</span>
            </div>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              {complexityDetail?.timeExplanation || notes || 'Scales predictably with input dimension.'}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#0d1117] border border-[#30363d] flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-[#8b949e]">
                <HardDrive className="w-3.5 h-3.5 text-[#3fb950]" />
                <span className="font-semibold uppercase tracking-wider text-[10px]">Space Complexity</span>
              </span>
              <span className="text-xs font-bold text-[#3fb950] font-mono">{spaceComplexity}</span>
            </div>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              {complexityDetail?.spaceExplanation || 'Memory allocation required during execution.'}
            </p>
          </div>
        </div>

        {/* Interactive Input Size Scaler */}
        <div className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d] flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-[#e6edf3]">Simulated Input Size (N):</span>
              <span className="ml-2 text-xs font-mono font-bold text-[#58a6ff]">
                N = {inputSize.toLocaleString()} elements
              </span>
            </div>

            {/* Quick Size Selectors */}
            <div className="flex items-center gap-1 bg-[#161b22] p-1 rounded-md border border-[#30363d]">
              {[10, 100, 1000, 10000].map(sz => (
                <button
                  key={sz}
                  onClick={() => setInputSize(sz)}
                  className={`text-[11px] px-2 py-0.5 rounded font-mono transition-colors ${
                    inputSize === sz
                      ? 'bg-[#58a6ff] text-[#0d1117] font-bold'
                      : 'text-[#8b949e] hover:text-[#e6edf3]'
                  }`}
                >
                  {sz >= 1000 ? `${sz / 1000}k` : sz}
                </button>
              ))}
            </div>
          </div>

          {/* Scalability Bars */}
          <div className="flex flex-col gap-2.5 pt-2">
            {/* O(1) */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="w-20 text-[#3fb950] font-bold flex items-center gap-1 shrink-0">
                <span>O(1)</span>
                {isO1 && <Zap className="w-3 h-3 fill-current text-[#3fb950]" />}
              </div>
              <div className="flex-1 bg-[#161b22] h-4 rounded-full overflow-hidden flex items-center px-2">
                <div className="bg-[#3fb950] h-2 rounded-full w-2"></div>
              </div>
              <span className="w-24 text-right text-[#8b949e]">{ops.o1.toLocaleString()} op</span>
            </div>

            {/* O(log N) */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="w-20 text-[#58a6ff] font-bold flex items-center gap-1 shrink-0">
                <span>O(log N)</span>
                {isLogN && <Zap className="w-3 h-3 fill-current text-[#58a6ff]" />}
              </div>
              <div className="flex-1 bg-[#161b22] h-4 rounded-full overflow-hidden flex items-center px-2">
                <div
                  className="bg-[#58a6ff] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(4, ops.oLogN * 5))}%` }}
                ></div>
              </div>
              <span className="w-24 text-right text-[#8b949e]">{ops.oLogN.toLocaleString()} ops</span>
            </div>

            {/* O(N) */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="w-20 text-[#e3b341] font-bold flex items-center gap-1 shrink-0">
                <span>O(N)</span>
                {isON && <Zap className="w-3 h-3 fill-current text-[#e3b341]" />}
              </div>
              <div className="flex-1 bg-[#161b22] h-4 rounded-full overflow-hidden flex items-center px-2">
                <div
                  className="bg-[#e3b341] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(10, (ops.oN / 10000) * 100))}%` }}
                ></div>
              </div>
              <span className="w-24 text-right text-[#8b949e]">{ops.oN.toLocaleString()} ops</span>
            </div>

            {/* O(N log N) */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="w-20 text-[#bc8cff] font-bold flex items-center gap-1 shrink-0">
                <span>O(N log N)</span>
                {isONLogN && <Zap className="w-3 h-3 fill-current text-[#bc8cff]" />}
              </div>
              <div className="flex-1 bg-[#161b22] h-4 rounded-full overflow-hidden flex items-center px-2">
                <div
                  className="bg-[#bc8cff] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(15, (ops.oNLogN / 140000) * 100))}%` }}
                ></div>
              </div>
              <span className="w-24 text-right text-[#8b949e]">{ops.oNLogN.toLocaleString()} ops</span>
            </div>

            {/* O(N^2) */}
            <div className="flex items-center gap-3 text-xs font-mono opacity-60">
              <div className="w-20 text-[#f85149] font-bold shrink-0">
                <span>O(N²)</span>
              </div>
              <div className="flex-1 bg-[#161b22] h-4 rounded-full overflow-hidden flex items-center px-2">
                <div
                  className="bg-[#f85149] h-2 rounded-full transition-all duration-300"
                  style={{ width: inputSize > 100 ? '100%' : `${ops.oN2 / 100}%` }}
                ></div>
              </div>
              <span className="w-24 text-right text-[#f85149]">
                {inputSize >= 1000 ? `${(ops.oN2 / 1000000).toFixed(0)}M ops` : `${ops.oN2.toLocaleString()} ops`}
              </span>
            </div>
          </div>
        </div>

        {/* Why this Complexity? Intuition Callout */}
        {complexityDetail && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-lg bg-[#0d1117] border border-[#30363d] flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#e6edf3]">
                <HelpCircle className="w-3.5 h-3.5 text-[#58a6ff]" />
                <span>Why is Time {timeComplexity.split('|')[0]}?</span>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                {complexityDetail.whyTime}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0d1117] border border-[#30363d] flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#e6edf3]">
                <HelpCircle className="w-3.5 h-3.5 text-[#3fb950]" />
                <span>Why is Space {spaceComplexity}?</span>
              </div>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                {complexityDetail.whySpace}
              </p>
            </div>
          </div>
        )}

        {/* Practical Comparison Table */}
        {complexityDetail?.comparisons && complexityDetail.comparisons.length > 0 && (
          <div className="border border-[#30363d] rounded-lg overflow-hidden">
            <div className="px-3.5 py-2 bg-[#1c2128] border-b border-[#30363d] text-xs font-semibold text-[#e6edf3]">
              Operation Trade-Offs Matrix
            </div>
            <div className="divide-y divide-[#30363d] text-xs">
              {complexityDetail.comparisons.map((c, i) => (
                <div key={i} className="p-3 bg-[#0d1117]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="font-medium text-[#e6edf3] sm:w-1/4">
                    {c.operation}
                  </div>
                  <div className="font-mono text-[#58a6ff] sm:w-1/4">
                    {c.thisStructure}
                  </div>
                  <div className="font-mono text-[#8b949e] sm:w-1/4">
                    {c.alternativeStructure}
                  </div>
                  <div className="text-[11px] text-[#3fb950] font-medium sm:w-1/4">
                    {c.advantage}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
