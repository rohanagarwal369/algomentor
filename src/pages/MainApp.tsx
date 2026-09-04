import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/TopBar';
import { Sidebar } from '../components/Sidebar';
import { NotesView } from '../components/NotesView';
import { PracticePanel } from '../components/PracticePanel';
import { ChatPanel } from '../components/ChatPanel';
import { SettingsModal } from '../components/SettingsModal';
import { BookOpen, Code2, Sparkles } from 'lucide-react';

export const MainApp: React.FC = () => {
  const { activeRightTab } = useApp();
  const [mobileTab, setMobileTab] = useState<'notes' | 'practice' | 'chat'>('notes');

  return (
    <div className="flex flex-col h-screen w-full bg-[#0d1117] text-[#e6edf3] font-sans overflow-hidden select-none">
      {/* Top persistent navigation bar */}
      <TopBar />

      {/* Mobile view switch pills (hidden on lg+ desktop) */}
      <div className="lg:hidden flex items-center justify-around bg-[#161b22] border-b border-[#30363d] p-1 text-xs shrink-0">
        <button
          onClick={() => setMobileTab('notes')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md font-medium transition-colors ${
            mobileTab === 'notes' ? 'bg-[#1c2128] text-[#58a6ff]' : 'text-[#8b949e]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Notes</span>
        </button>
        <button
          onClick={() => setMobileTab('practice')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md font-medium transition-colors ${
            mobileTab === 'practice' ? 'bg-[#1c2128] text-[#3fb950]' : 'text-[#8b949e]'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Practice</span>
        </button>
        <button
          onClick={() => setMobileTab('chat')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md font-medium transition-colors ${
            mobileTab === 'chat' ? 'bg-[#1c2128] text-[#a371f7]' : 'text-[#8b949e]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gemini AI</span>
        </button>
      </div>

      {/* Main viewport workspace */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Collapsible left sidebar */}
        <Sidebar />

        {/* Center panel: Notes view (always visible on desktop, tabbed on mobile) */}
        <div className={`flex-1 flex overflow-hidden ${mobileTab === 'notes' ? 'flex' : 'hidden lg:flex'}`}>
          <NotesView />
        </div>

        {/* Right-docked column: Practice + Gemini AI */}
        <section 
          id="app-right-column"
          className={`w-full lg:w-[420px] xl:w-[460px] bg-[#161b22] border-l border-[#30363d] flex-col overflow-hidden shrink-0 z-10 transition-all duration-200 ${
            mobileTab !== 'notes' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* On mobile, if practice is selected show PracticePanel, if chat show ChatPanel */}
          <div className="lg:hidden flex-1 flex flex-col overflow-hidden">
            {mobileTab === 'practice' && <PracticePanel />}
            {mobileTab === 'chat' && <ChatPanel />}
          </div>

          {/* On desktop (lg+), follow activeRightTab setting */}
          <div className="hidden lg:flex flex-col h-full overflow-hidden">
            {activeRightTab === 'split' ? (
              <>
                {/* Top half: Practice test problem & code editor */}
                <div className="flex flex-col h-1/2 border-b border-[#30363d] overflow-hidden">
                  <PracticePanel />
                </div>

                {/* Bottom half: Screen-aware Ask Gemini AI */}
                <div className="flex-1 flex flex-col overflow-hidden bg-[#161b22]">
                  <ChatPanel />
                </div>
              </>
            ) : activeRightTab === 'practice' ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                <PracticePanel />
              </div>
            ) : (
              <div className="flex-1 flex flex-col overflow-hidden bg-[#161b22]">
                <ChatPanel />
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Settings Modal */}
      <SettingsModal />
    </div>
  );
};
