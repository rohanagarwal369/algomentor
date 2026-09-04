import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  GitCommit, 
  LayoutGrid, 
  Layers, 
  ListOrdered, 
  Network, 
  Share2, 
  Cpu, 
  ArrowUpDown,
  BookOpen,
  Trophy
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    topics, 
    activeTopicId, 
    setActiveTopicId, 
    toggleTopicCompletion,
    isSidebarOpen, 
    toggleSidebar,
    dsaProgress
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  // Icon mapping
  const getTopicIcon = (iconName: string) => {
    const props = { className: "w-3.5 h-3.5 shrink-0" };
    switch (iconName) {
      case 'GitCommit': return <GitCommit {...props} />;
      case 'LayoutGrid': return <LayoutGrid {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'ListOrdered': return <ListOrdered {...props} />;
      case 'Network': return <Network {...props} />;
      case 'Share2': return <Share2 {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'ArrowUpDown': return <ArrowUpDown {...props} />;
      default: return <BookOpen {...props} />;
    }
  };

  const filteredTopics = topics.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedCount = topics.filter(t => t.completed).length;
  const totalTopicsCount = topics.length;
  const curriculumPercent = totalTopicsCount > 0 ? Math.round((completedCount / totalTopicsCount) * 100) : 0;

  const handleSelectTopic = (id: string) => {
    setActiveTopicId(id);
    if (typeof window !== 'undefined' && window.innerWidth < 1024 && isSidebarOpen) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Sidebar container with smooth collapse/expand width transition */}
      <aside
        id="app-sidebar"
        className={`bg-[#0d1117] border-r border-[#30363d] flex flex-col shrink-0 transition-all duration-300 ease-in-out select-none relative z-20 overflow-hidden ${
          isSidebarOpen ? 'w-56 md:w-60' : 'w-0 border-r-0'
        }`}
      >
        <div className="w-56 md:w-60 flex flex-col h-full">
          {/* Search box */}
          <div className="p-3 border-b border-[#30363d]/50">
            <div className="relative">
              <input
                id="input-topic-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics..."
                className="w-full bg-[#161b22] border border-[#30363d] rounded px-8 py-1.5 text-xs text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] transition-colors"
              />
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#8b949e]" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-[10px] text-[#8b949e] hover:text-[#e6edf3]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Topics navigation list */}
          <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1 select-none scrollbar-thin">
            {/* Compact Curriculum Progress Header Card */}
            <div 
              id="sidebar-curriculum-progress"
              className="mb-2.5 p-2.5 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff]/40 transition-all shadow-xs"
            >
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#e6edf3]">
                <span className="flex items-center gap-1.5 text-[#58a6ff]">
                  <Trophy className="w-3.5 h-3.5 shrink-0" />
                  <span>Curriculum Progress</span>
                </span>
                <span className="font-mono text-[#58a6ff] font-bold text-xs">
                  {curriculumPercent}%
                </span>
              </div>

              {/* Progress bar directly connected to curriculum topics completion */}
              <div className="w-full bg-[#0d1117] h-2 rounded-full overflow-hidden mt-2 border border-[#30363d]/70 p-0.5">
                <div 
                  className="bg-gradient-to-r from-[#1f6feb] to-[#58a6ff] h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${curriculumPercent}%` }}
                />
              </div>

              {/* Status and completion counter */}
              <div className="flex items-center justify-between text-[10px] text-[#8b949e] mt-2 font-mono">
                <span className="text-[#c9d1d9] font-medium">
                  {completedCount}/{totalTopicsCount} Completed
                </span>
                <span className={curriculumPercent === 100 ? 'text-[#3fb950] font-semibold' : 'text-[#8b949e]'}>
                  {curriculumPercent === 100 ? 'Mastered! 🎉' : `${totalTopicsCount - completedCount} left`}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between px-2 py-1.5 text-[10px] font-bold text-[#8b949e] uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-[#58a6ff]" />
                <span>Curriculum Topics</span>
              </span>
              <span className="text-[#3fb950] font-mono text-[9px] font-semibold bg-[#161b22] px-1.5 py-0.5 rounded border border-[#30363d]">
                {completedCount}/{totalTopicsCount}
              </span>
            </div>

            <div className="space-y-1">
              {filteredTopics.map((topic) => {
                const isActive = topic.id === activeTopicId;
                return (
                  <div
                    key={topic.id}
                    id={`topic-item-${topic.id}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelectTopic(topic.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectTopic(topic.id);
                      }
                    }}
                    className={`group flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium cursor-pointer transition-all duration-150 select-none ${
                      isActive 
                        ? 'bg-[#1f242c] border border-[#58a6ff]/60 text-[#e6edf3] shadow-xs' 
                        : 'text-[#8b949e] hover:bg-[#161b22] hover:text-[#e6edf3] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {/* Completion checkmark button */}
                      <button
                        type="button"
                        id={`btn-toggle-topic-${topic.id}`}
                        title={topic.completed ? `Mark "${topic.title}" as uncompleted` : `Mark "${topic.title}" as completed`}
                        aria-label={topic.completed ? `Mark "${topic.title}" as uncompleted` : `Mark "${topic.title}" as completed`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTopicCompletion(topic.id);
                        }}
                        className="cursor-pointer hover:scale-110 transition-transform p-0.5 shrink-0 focus:outline-none"
                      >
                        {topic.completed ? (
                          <div className="w-4 h-4 rounded bg-[#3fb950]/20 border border-[#3fb950] flex items-center justify-center text-[#3fb950] shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 border border-[#30363d] rounded bg-[#0d1117] group-hover:border-[#8b949e] transition-colors" />
                        )}
                      </button>

                      {/* Topic Title */}
                      <span className={`truncate text-xs ${isActive ? 'text-[#58a6ff] font-semibold' : 'text-[#c9d1d9] group-hover:text-[#e6edf3]'}`}>
                        {topic.title}
                      </span>
                    </div>

                    {/* Topic difficulty indicator badge */}
                    <span 
                      className={`text-[9px] font-mono font-semibold uppercase px-1.5 py-0.5 rounded transition-opacity shrink-0 ml-1.5 ${
                        topic.difficulty === 'Easy' 
                          ? 'text-[#3fb950] bg-[#3fb950]/10 border border-[#3fb950]/30' 
                          : topic.difficulty === 'Medium' 
                            ? 'text-[#e3b341] bg-[#e3b341]/10 border border-[#e3b341]/30' 
                            : 'text-[#f85149] bg-[#f85149]/10 border border-[#f85149]/30'
                      }`}
                    >
                      {topic.difficulty}
                    </span>
                  </div>
                );
              })}

              {filteredTopics.length === 0 && (
                <div className="px-3 py-6 text-center text-xs text-[#8b949e]">
                  No topics matching "{searchQuery}"
                </div>
              )}
            </div>
          </nav>

          {/* Bottom collapse button inside sidebar */}
          <div className="p-2 border-t border-[#30363d] flex items-center justify-between text-[11px] text-[#8b949e] bg-[#0d1117]">
            <span className="truncate">Algo Curriculum</span>
            <button
              onClick={toggleSidebar}
              title="Collapse sidebar"
              className="p-1 hover:bg-[#161b22] hover:text-[#e6edf3] rounded transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Floating expand button when sidebar is collapsed */}
      {!isSidebarOpen && (
        <button
          id="btn-expand-sidebar-floating"
          onClick={toggleSidebar}
          title="Expand sidebar"
          className="absolute left-2 top-14 z-20 bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff] text-[#8b949e] hover:text-[#e6edf3] p-1.5 rounded-md shadow-lg transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </>
  );
};
