import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Terminal, 
  Menu, 
  Flame, 
  Settings, 
  LogOut, 
  Moon, 
  Sun, 
  Trophy,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProgressModal } from './ProgressModal';

export const TopBar: React.FC = () => {
  const { 
    user, 
    logout, 
    toggleSidebar, 
    isSidebarOpen, 
    setIsSettingsOpen, 
    isDarkMode, 
    toggleDarkMode,
    activeRightTab,
    setActiveRightTab,
    topics,
    dsaProgress
  } = useApp();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // TODO: backend - invoke logout API
    logout();
    navigate('/login');
  };

  const progressPercent = dsaProgress.overallCompletion;

  return (
    <>
      <header 
        id="app-topbar"
        className="h-12 border-b border-[#30363d] bg-[#161b22] flex items-center justify-between px-3 md:px-4 shrink-0 select-none z-30 transition-colors duration-200"
      >
        {/* Left side: Hamburger + AlgoMentor brand */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            id="btn-toggle-sidebar"
            onClick={toggleSidebar}
            title={isSidebarOpen ? "Collapse sidebar (Ctrl+B)" : "Expand sidebar (Ctrl+B)"}
            className="p-1.5 rounded text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#1c2128] transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded bg-[#1c2128] border border-[#30363d] flex items-center justify-center group-hover:border-[#58a6ff] transition-colors">
              <Terminal className="w-4 h-4 text-[#58a6ff]" />
            </div>
            <span className="font-bold text-base md:text-lg tracking-tight text-[#e6edf3] group-hover:text-white transition-colors">
              AlgoMentor
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#0d1117] border border-[#30363d] text-[#8b949e]">
              DSA Tutor
            </span>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Streak indicator */}
          <div 
            id="streak-indicator"
            title={`${user?.streakDays || 7} consecutive study days logged`}
            className="hidden sm:flex items-center gap-1.5 bg-[#0d1117] border border-[#30363d] px-2.5 py-1 rounded-md text-xs"
          >
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />
            <span className="font-semibold text-[#e6edf3]">{user?.streakDays || 7} Days</span>
          </div>

          {/* DSA Progress Button */}
          <button
            id="btn-curriculum-progress"
            onClick={() => setIsProgressOpen(true)}
            title="View overall DSA learning journey and category mastery"
            className="flex items-center gap-1.5 bg-[#0d1117] hover:bg-[#1c2128] border border-[#30363d] hover:border-[#58a6ff]/50 px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5 text-[#e3b341]" />
            <span className="font-semibold text-[#e6edf3] hidden md:inline">DSA Progress:</span>
            <span className="font-mono font-bold text-[#58a6ff]">{progressPercent}%</span>
          </button>

          {/* Right panel layout toggle (Practice / Split / Chat) */}
          <div className="hidden lg:flex items-center bg-[#0d1117] border border-[#30363d] rounded-md p-0.5 text-xs text-[#8b949e]">
            <button
              onClick={() => setActiveRightTab('split')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                activeRightTab === 'split' ? 'bg-[#1c2128] text-[#e6edf3] shadow-sm' : 'hover:text-[#e6edf3]'
              }`}
              title="Split Practice & AI Chat"
            >
              Split
            </button>
            <button
              onClick={() => setActiveRightTab('practice')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                activeRightTab === 'practice' ? 'bg-[#1c2128] text-[#e6edf3] shadow-sm' : 'hover:text-[#e6edf3]'
              }`}
              title="Focus on Code Practice"
            >
              Practice
            </button>
            <button
              onClick={() => setActiveRightTab('chat')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                activeRightTab === 'chat' ? 'bg-[#1c2128] text-[#a371f7] font-semibold shadow-sm' : 'hover:text-[#a371f7]'
              }`}
              title="Focus on Gemini AI"
            >
              AI Chat
            </button>
          </div>

          {/* Theme mode toggle */}
          <button
            id="btn-toggle-theme"
            onClick={toggleDarkMode}
            title={isDarkMode ? "Switch to light mode" : "Switch to Elegant Dark mode"}
            className="p-1.5 rounded text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#1c2128] transition-colors cursor-pointer"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-yellow-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#58a6ff]" />
            )}
          </button>

          {/* Settings gear */}
          <button
            id="btn-open-settings"
            onClick={() => setIsSettingsOpen(true)}
            title="Settings & API Key"
            className="p-1.5 rounded text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#1c2128] transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* User avatar and dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              id="btn-user-avatar"
              onClick={() => setIsProfileOpen(prev => !prev)}
              title={user?.name || "User Account"}
              className="w-7 h-7 rounded-full bg-[#a371f7] flex items-center justify-center text-xs font-bold text-white border border-[#30363d] cursor-pointer hover:ring-2 hover:ring-[#58a6ff] transition-all"
            >
              {user?.initials || 'RA'}
            </button>

            {isProfileOpen && (
              <div 
                id="user-profile-menu"
                className="absolute right-0 mt-2 w-64 bg-[#161b22] border border-[#30363d] rounded-lg shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="p-2 border-b border-[#30363d]">
                  <p className="text-xs font-semibold text-[#e6edf3] truncate">{user?.name || 'Rohan Agarwal'}</p>
                  <p className="text-[11px] text-[#8b949e] truncate">{user?.email || 'rohanagarwal082005@gmail.com'}</p>
                </div>

                <div className="py-2 px-2 border-b border-[#30363d] space-y-1.5 text-xs text-[#8b949e]">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      setIsProgressOpen(true);
                    }}
                    className="w-full flex items-center justify-between text-left hover:text-[#e6edf3] p-1 rounded hover:bg-[#1c2128]"
                  >
                    <span>DSA Overall Progress</span>
                    <span className="text-[#58a6ff] font-semibold">{dsaProgress.overallCompletion}%</span>
                  </button>
                  <div className="flex justify-between items-center p-1">
                    <span>Topics Mastered</span>
                    <span className="text-[#3fb950] font-semibold">{dsaProgress.topicsCompleted} / {dsaProgress.totalTopics}</span>
                  </div>
                  <div className="flex justify-between items-center p-1">
                    <span>Problems Solved</span>
                    <span className="text-[#bc8cff] font-semibold">{dsaProgress.problemsSolved}</span>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    id="btn-logout"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-[#f85149] hover:bg-[#1c2128] rounded transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Curriculum Mastery Modal */}
      <ProgressModal isOpen={isProgressOpen} onClose={() => setIsProgressOpen(false)} />
    </>
  );
};
