import React, { useState, useEffect, useRef } from 'react';
import { VisualizerConfig, VisualizationStep } from '../../types';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Sparkles, FastForward, Activity } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DSAVisualizerProps {
  config?: VisualizerConfig;
  topicTitle: string;
}

export const DSAVisualizer: React.FC<DSAVisualizerProps> = ({ config, topicTitle }) => {
  const { sendMessage, setActiveRightTab } = useApp();
  const [activeOpIndex, setActiveOpIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1); // 0.5x, 1x, 1.5x

  const activeOp = config?.operations[activeOpIndex];
  const steps: VisualizationStep[] = activeOp?.steps || [];
  const currentStep: VisualizationStep | undefined = steps[currentStepIndex];

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      const intervalMs = Math.round(1800 / playbackSpeed);
      timer = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, intervalMs);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentStepIndex, steps.length, playbackSpeed]);

  // Reset step when operation changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [activeOpIndex, config]);

  if (!config || !activeOp) {
    return (
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 text-center text-[#8b949e]">
        <Activity className="w-8 h-8 mx-auto mb-2 text-[#58a6ff] opacity-60" />
        <p className="text-sm font-medium text-[#e6edf3]">Interactive visualizer model coming soon for {topicTitle}</p>
        <p className="text-xs mt-1">Review the conceptual breakdown and code implementation below.</p>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleAskAboutStep = () => {
    setActiveRightTab('chat');
    sendMessage(
      `Can you explain what is happening in Step ${currentStepIndex + 1} of the "${activeOp.name}" visualization? (Step description: "${currentStep?.description}")`
    );
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-lg flex flex-col">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#1c2128] border-b border-[#30363d]">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-[#58a6ff]/10 text-[#58a6ff] rounded-md border border-[#58a6ff]/20">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#58a6ff]">Interactive Visualizer</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#30363d] text-[#8b949e] font-mono">
                {activeOp.complexity}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-[#e6edf3]">{activeOp.name}</h3>
          </div>
        </div>

        {/* Operation Selector if multiple */}
        {config.operations.length > 1 && (
          <div className="flex items-center gap-1 bg-[#0d1117] p-1 rounded-lg border border-[#30363d]">
            {config.operations.map((op, idx) => (
              <button
                key={op.id}
                onClick={() => setActiveOpIndex(idx)}
                className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                  activeOpIndex === idx
                    ? 'bg-[#21262d] text-[#58a6ff] shadow-sm'
                    : 'text-[#8b949e] hover:text-[#e6edf3]'
                }`}
              >
                {op.name.split(' ')[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Visual Canvas Area */}
      <div className="p-5 bg-[#0d1117]/80 min-h-[220px] flex flex-col justify-center items-center relative overflow-x-auto">
        {/* Linked List Canvas */}
        {config.type === 'linked-list' && currentStep?.listNodes && (
          <div className="flex flex-col items-center gap-6 py-3 w-full">
            {/* Pointers Legend & Active Status */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#3fb950]">
                <span className="w-2 h-2 rounded-full bg-[#3fb950]"></span>
                <span>prev: {currentStep.pointers?.prev ?? 'null'}</span>
              </span>
              <span className="flex items-center gap-1.5 text-[#58a6ff]">
                <span className="w-2 h-2 rounded-full bg-[#58a6ff]"></span>
                <span>curr: {currentStep.pointers?.curr ?? 'null'}</span>
              </span>
              {currentStep.pointers?.next && (
                <span className="flex items-center gap-1.5 text-[#bc8cff]">
                  <span className="w-2 h-2 rounded-full bg-[#bc8cff]"></span>
                  <span>nextTemp: {currentStep.pointers.next}</span>
                </span>
              )}
            </div>

            {/* Nodes Row */}
            <div className="flex items-center gap-2 flex-nowrap px-4 py-2">
              {currentStep.listNodes.map((node, i) => {
                const isCurr = currentStep.pointers?.curr === String(node.value) || currentStep.pointers?.curr === node.id;
                const isPrev = currentStep.pointers?.prev === String(node.value) || currentStep.pointers?.prev === node.id;
                const isNext = currentStep.pointers?.next === String(node.value) || currentStep.pointers?.next === node.id;

                return (
                  <React.Fragment key={node.id}>
                    <div className="flex flex-col items-center">
                      {/* Top pointer indicators */}
                      <div className="h-5 flex items-center gap-1 mb-1 text-[10px] font-mono font-bold">
                        {isPrev && <span className="bg-[#3fb950]/20 text-[#3fb950] px-1.5 py-0.2 rounded border border-[#3fb950]/40">prev</span>}
                        {isCurr && <span className="bg-[#58a6ff]/20 text-[#58a6ff] px-1.5 py-0.2 rounded border border-[#58a6ff]/40">curr</span>}
                        {isNext && <span className="bg-[#bc8cff]/20 text-[#bc8cff] px-1.5 py-0.2 rounded border border-[#bc8cff]/40">next</span>}
                      </div>

                      {/* Node Box */}
                      <div
                        className={`flex items-center h-12 rounded-lg border-2 font-mono transition-all duration-300 shadow-sm ${
                          isCurr
                            ? 'bg-[#161b22] border-[#58a6ff] text-[#58a6ff] shadow-[#58a6ff]/20 shadow-md scale-105'
                            : isPrev
                            ? 'bg-[#161b22] border-[#3fb950] text-[#3fb950]'
                            : isNext
                            ? 'bg-[#161b22] border-[#bc8cff] text-[#bc8cff]'
                            : 'bg-[#161b22] border-[#30363d] text-[#e6edf3]'
                        }`}
                      >
                        <div className="px-3 py-1 font-bold text-base border-r border-[#30363d]">
                          {node.value}
                        </div>
                        <div className="px-2 py-1 text-xs text-[#8b949e]">
                          {node.nextId ? `→ [${node.nextId}]` : '→ ∅'}
                        </div>
                      </div>

                      {/* Head label */}
                      {node.isHead && (
                        <span className="text-[10px] text-[#e3b341] font-mono mt-1 font-medium">HEAD</span>
                      )}
                    </div>

                    {/* Connecting Pointer Arrow */}
                    {i < (currentStep.listNodes?.length ?? 0) - 1 && (
                      <div className="flex items-center text-[#8b949e] font-mono text-sm px-1">
                        →
                      </div>
                    )}
                  </React.Fragment>
                );
              })}

              <div className="text-xs font-mono text-[#8b949e] pl-2 flex items-center">
                → <span className="ml-1 px-2 py-1 bg-[#161b22] rounded border border-[#30363d] text-[#f85149]">NULL</span>
              </div>
            </div>
          </div>
        )}

        {/* Arrays Two-Pointer Canvas */}
        {config.type === 'array' && currentStep?.arrayElements && (
          <div className="flex flex-col items-center gap-5 w-full py-2">
            <div className="flex items-center gap-2">
              {currentStep.arrayElements.map(el => {
                const isLeft = currentStep.pointers?.left === el.index;
                const isRight = currentStep.pointers?.right === el.index;

                return (
                  <div key={el.index} className="flex flex-col items-center">
                    <span className="text-[10px] font-mono text-[#8b949e] mb-1">[{el.index}]</span>
                    <div
                      className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-base transition-all duration-300 ${
                        el.state === 'matched'
                          ? 'bg-[#3fb950]/20 border-[#3fb950] text-[#3fb950] scale-110 shadow-lg'
                          : el.state === 'active'
                          ? 'bg-[#58a6ff]/20 border-[#58a6ff] text-[#58a6ff] scale-105'
                          : el.state === 'discarded'
                          ? 'bg-[#161b22]/40 border-[#30363d]/50 text-[#8b949e]/40'
                          : 'bg-[#161b22] border-[#30363d] text-[#e6edf3]'
                      }`}
                    >
                      {el.value}
                    </div>

                    {/* Pointer Badges */}
                    <div className="h-5 flex items-center gap-1 mt-1 text-[10px] font-mono font-bold">
                      {isLeft && <span className="bg-[#58a6ff]/20 text-[#58a6ff] px-1.5 py-0.2 rounded border border-[#58a6ff]/40">left</span>}
                      {isRight && <span className="bg-[#e3b341]/20 text-[#e3b341] px-1.5 py-0.2 rounded border border-[#e3b341]/40">right</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stacks Canvas */}
        {config.type === 'stack' && (
          <div className="flex flex-col items-center gap-3 w-full py-2">
            <div className="flex items-end justify-center min-h-[140px]">
              <div className="w-36 border-2 border-t-0 border-[#30363d] rounded-b-xl p-2 bg-[#161b22]/60 flex flex-col-reverse gap-1.5 items-center min-h-[120px]">
                {currentStep?.stackElements && currentStep.stackElements.length > 0 ? (
                  currentStep.stackElements.map((item, idx) => (
                    <div
                      key={idx}
                      className={`w-full py-1.5 px-3 rounded text-center font-mono font-bold text-sm transition-all duration-200 ${
                        idx === (currentStep.stackElements?.length ?? 1) - 1
                          ? 'bg-[#58a6ff]/20 border border-[#58a6ff] text-[#58a6ff]'
                          : 'bg-[#21262d] border border-[#30363d] text-[#e6edf3]'
                      }`}
                    >
                      {item.value} {idx === (currentStep.stackElements?.length ?? 1) - 1 ? '(TOP)' : ''}
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-[#8b949e] italic my-auto">Stack is Empty</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Queues Canvas */}
        {config.type === 'queue' && currentStep?.queueElements && (
          <div className="flex flex-col items-center gap-3 w-full py-2">
            <div className="flex items-center gap-2">
              {currentStep.queueElements.map(el => (
                <div key={el.index} className="flex flex-col items-center">
                  <span className="text-[10px] font-mono text-[#8b949e] mb-1">Slot {el.index}</span>
                  <div
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-sm ${
                      el.isEmptySlot
                        ? 'border-dashed border-[#30363d] text-[#8b949e]/40 bg-[#161b22]/30'
                        : 'border-[#58a6ff] bg-[#161b22] text-[#58a6ff]'
                    }`}
                  >
                    {el.value}
                  </div>
                  <div className="h-4 mt-1 text-[9px] font-mono font-semibold flex gap-1">
                    {el.isHead && <span className="text-[#3fb950]">HEAD</span>}
                    {el.isTail && <span className="text-[#e3b341]">TAIL</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trees Canvas */}
        {config.type === 'tree' && currentStep?.treeNodes && (
          <div className="relative w-72 h-44 my-1">
            <svg className="w-full h-full absolute inset-0 pointer-events-none">
              <line x1="50%" y1="20%" x2="25%" y2="50%" stroke="#30363d" strokeWidth="2" />
              <line x1="50%" y1="20%" x2="75%" y2="50%" stroke="#30363d" strokeWidth="2" />
              <line x1="25%" y1="50%" x2="12%" y2="85%" stroke="#30363d" strokeWidth="2" />
              <line x1="25%" y1="50%" x2="38%" y2="85%" stroke="#30363d" strokeWidth="2" />
            </svg>
            {currentStep.treeNodes.map(node => (
              <div
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                className={`absolute w-9 h-9 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 ${
                  node.state === 'current'
                    ? 'bg-[#58a6ff] text-[#0d1117] border-white shadow-lg scale-110 z-10'
                    : node.state === 'visited'
                    ? 'bg-[#3fb950]/20 border-[#3fb950] text-[#3fb950]'
                    : node.state === 'visiting'
                    ? 'bg-[#e3b341]/20 border-[#e3b341] text-[#e3b341]'
                    : 'bg-[#161b22] border-[#30363d] text-[#e6edf3]'
                }`}
              >
                {node.value}
              </div>
            ))}
          </div>
        )}

        {/* DP / Tabulation Canvas */}
        {config.type === 'dp' && currentStep?.dpTable && (
          <div className="flex flex-col items-center gap-3 w-full py-2">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {currentStep.dpTable.map(cell => (
                <div key={cell.index} className="flex flex-col items-center">
                  <span className="text-[10px] font-mono text-[#8b949e] mb-1">{cell.label}</span>
                  <div
                    className={`w-14 h-12 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-base transition-all duration-300 ${
                      cell.state === 'current'
                        ? 'bg-[#58a6ff]/20 border-[#58a6ff] text-[#58a6ff] scale-105 shadow-md'
                        : cell.state === 'computed'
                        ? 'bg-[#3fb950]/15 border-[#3fb950]/60 text-[#3fb950]'
                        : cell.state === 'base'
                        ? 'bg-[#e3b341]/15 border-[#e3b341]/60 text-[#e3b341]'
                        : 'bg-[#161b22]/40 border-dashed border-[#30363d] text-[#8b949e]/40'
                    }`}
                  >
                    {cell.value}
                  </div>
                  {cell.formula && (
                    <span className="text-[9px] font-mono text-[#8b949e] mt-1">{cell.formula}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Searching & Sorting Canvas */}
        {(config.type === 'searching' || config.type === 'sorting') && currentStep?.arrayElements && (
          <div className="flex flex-col items-center gap-4 w-full py-2">
            <div className="flex items-center gap-2">
              {currentStep.arrayElements.map(el => (
                <div key={el.index} className="flex flex-col items-center">
                  <span className="text-[10px] font-mono text-[#8b949e] mb-1">[{el.index}]</span>
                  <div
                    className={`w-11 h-11 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-sm transition-all duration-200 ${
                      el.state === 'matched' || el.state === 'sorted'
                        ? 'bg-[#3fb950]/20 border-[#3fb950] text-[#3fb950] scale-105'
                        : el.state === 'comparing' || el.state === 'active'
                        ? 'bg-[#58a6ff]/20 border-[#58a6ff] text-[#58a6ff] scale-105'
                        : el.state === 'discarded'
                        ? 'bg-[#161b22]/30 border-[#30363d]/30 text-[#8b949e]/30'
                        : 'bg-[#161b22] border-[#30363d] text-[#e6edf3]'
                    }`}
                  >
                    {el.value}
                  </div>
                  <div className="h-4 mt-1 text-[9px] font-mono font-bold flex gap-1">
                    {currentStep.pointers?.left === el.index && <span className="text-[#58a6ff]">L</span>}
                    {currentStep.pointers?.mid === el.index && <span className="text-[#e3b341]">MID</span>}
                    {currentStep.pointers?.right === el.index && <span className="text-[#bc8cff]">R</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Graphs Grid Canvas */}
        {config.type === 'graph' && currentStep?.gridCells && (
          <div className="flex flex-col items-center gap-1 py-1">
            {currentStep.gridCells.map((row, rIdx) => (
              <div key={rIdx} className="flex items-center gap-1">
                {row.map((cell, cIdx) => (
                  <div
                    key={cIdx}
                    className={`w-10 h-10 rounded border flex items-center justify-center font-mono font-bold text-xs transition-colors duration-200 ${
                      cell.state === 'visiting'
                        ? 'bg-[#58a6ff] text-[#0d1117] border-white scale-105'
                        : cell.state === 'visited_island'
                        ? 'bg-[#3fb950]/30 border-[#3fb950] text-[#3fb950]'
                        : cell.state === 'land'
                        ? 'bg-[#e3b341]/20 border-[#e3b341] text-[#e3b341]'
                        : 'bg-[#161b22] border-[#30363d] text-[#8b949e]/50'
                    }`}
                  >
                    {cell.value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Step Dynamic Stats Row */}
        {currentStep?.stats && Object.keys(currentStep.stats).length > 0 && (
          <div className="flex items-center gap-3 mt-3 px-3 py-1.5 rounded-md bg-[#161b22] border border-[#30363d] text-xs font-mono">
            {Object.entries(currentStep.stats).map(([key, val]) => (
              <span key={key} className="text-[#8b949e]">
                <strong className="text-[#e6edf3] font-medium">{key}:</strong>{' '}
                <span className="text-[#58a6ff]">{String(val)}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Step Description & Code Sync Banner */}
      <div className="px-4 py-3 bg-[#161b22] border-t border-[#30363d] flex flex-col md:flex-row gap-4">
        {/* Left: Step Description */}
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-bold text-[#e6edf3]">
              {currentStep?.title || `Step ${currentStepIndex + 1}`}
            </span>
            <span className="text-[11px] font-mono text-[#8b949e]">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>
          <p className="text-xs text-[#8b949e] leading-relaxed">
            {currentStep?.description}
          </p>
        </div>

        {/* Right: Code Snippet Highlight */}
        {activeOp.codeSnippet && (
          <div className="md:w-64 bg-[#0d1117] p-2.5 rounded-lg border border-[#30363d] font-mono text-[11px] overflow-hidden shrink-0">
            <div className="text-[10px] text-[#8b949e] uppercase tracking-wider mb-1 font-semibold">
              Algorithm Invariant
            </div>
            <pre className="text-[#e6edf3] overflow-x-auto whitespace-pre leading-snug">
              {activeOp.codeSnippet.split('\n').map((line, lIdx) => {
                const isHighlighted = currentStep?.codeLineHighlight === lIdx + 1;
                return (
                  <div
                    key={lIdx}
                    className={`${isHighlighted ? 'bg-[#58a6ff]/20 text-[#58a6ff] font-bold px-1 -mx-1 rounded' : 'text-[#8b949e]'}`}
                  >
                    {line}
                  </div>
                );
              })}
            </pre>
          </div>
        )}
      </div>

      {/* Playback Controls Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[#1c2128] border-t border-[#30363d]">
        {/* Play / Step Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleReset}
            title="Reset to Step 1"
            className="p-1.5 text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#30363d] rounded transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            title="Previous Step"
            className="p-1.5 text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#30363d] rounded disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause' : 'Play Animation'}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition-colors ${
              isPlaying
                ? 'bg-[#e3b341] text-[#0d1117]'
                : 'bg-[#58a6ff] text-[#0d1117] hover:bg-[#79b8ff]'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIndex === steps.length - 1}
            title="Next Step"
            className="p-1.5 text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#30363d] rounded disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Speed Toggle */}
          <div className="flex items-center ml-2 bg-[#0d1117] rounded border border-[#30363d] p-0.5 text-[10px] font-mono">
            {[0.5, 1, 1.5].map(spd => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-1.5 py-0.5 rounded ${
                  playbackSpeed === spd ? 'bg-[#30363d] text-[#58a6ff] font-bold' : 'text-[#8b949e] hover:text-[#e6edf3]'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Step dots scrubber */}
        <div className="hidden sm:flex items-center gap-1">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentStepIndex(idx);
                setIsPlaying(false);
              }}
              className={`h-2 rounded-full transition-all duration-200 ${
                idx === currentStepIndex
                  ? 'w-6 bg-[#58a6ff]'
                  : idx < currentStepIndex
                  ? 'w-2 bg-[#3fb950]'
                  : 'w-2 bg-[#30363d] hover:bg-[#8b949e]'
              }`}
              title={`Jump to step ${idx + 1}`}
            />
          ))}
        </div>

        {/* Ask Mentor About Step Button */}
        <button
          onClick={handleAskAboutStep}
          className="flex items-center gap-1 text-xs text-[#a371f7] hover:text-[#bc8cff] hover:bg-[#a371f7]/10 px-2.5 py-1 rounded border border-[#a371f7]/30 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask AI about step</span>
        </button>
      </div>
    </div>
  );
};
