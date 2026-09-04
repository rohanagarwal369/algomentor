import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SupportedLanguage, ContentLanguage } from '../types';
import { 
  X, 
  Key, 
  Eye, 
  EyeOff, 
  Save, 
  Check, 
  Cpu, 
  Sliders, 
  ShieldCheck,
  Terminal,
  Sparkles,
  Code2,
  Languages
} from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const { 
    isSettingsOpen, 
    setIsSettingsOpen, 
    settings, 
    updateSettings,
    user,
    selectedLanguage,
    setSelectedLanguage,
    contentLanguage,
    setContentLanguage
  } = useApp();

  const [apiKey, setApiKey] = useState(settings.geminiApiKey);
  const [model, setModel] = useState(settings.model);
  const [fontSize, setFontSize] = useState(settings.editorFontSize);
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isSettingsOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: backend - securely validate and persist the API key and preference settings to backend vault
    updateSettings({
      geminiApiKey: apiKey,
      model,
      editorFontSize: fontSize,
      preferredLanguage: selectedLanguage,
      contentLanguage: contentLanguage
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsSettingsOpen(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="settings-modal"
        className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 text-[#e6edf3]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#30363d] bg-[#1c2128]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#58a6ff]" />
            <h2 className="text-sm font-bold tracking-tight">AlgoMentor Settings</h2>
          </div>
          <button
            id="btn-close-settings"
            onClick={() => setIsSettingsOpen(false)}
            className="text-[#8b949e] hover:text-[#e6edf3] p-1 rounded hover:bg-[#0d1117] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSave} className="p-5 space-y-5 text-xs">
          {/* API Key Section */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 font-semibold text-[#e6edf3]">
              <Key className="w-3.5 h-3.5 text-[#a371f7]" />
              <span>Gemini API Key</span>
            </label>
            <p className="text-[#8b949e] text-[11px] leading-relaxed">
              Add your own Gemini API key to use your personal free tier quota.
            </p>

            <div className="relative">
              <input
                id="input-api-key"
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] rounded-lg px-3 py-2 pr-10 font-mono text-xs focus:outline-none focus:border-[#a371f7] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2.5 top-2.5 text-[#8b949e] hover:text-[#e6edf3] cursor-pointer"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-[#8b949e]">
              <ShieldCheck className="w-3 h-3 text-[#3fb950]" />
              <span>Key is stored securely on your browser instance.</span>
            </div>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 font-semibold text-[#e6edf3]">
              <Cpu className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>AI Tutor Model</span>
            </label>
            <select
              id="select-ai-model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#58a6ff] cursor-pointer font-mono"
            >
              <option value="gemini-2.5-flash">Gemini 2.5 Flash (Ultra-fast code generation)</option>
              <option value="gemini-2.5-pro">Gemini 2.5 Pro (Deep algorithmic reasoning)</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
            </select>
          </div>

          {/* Preferred Language Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 font-semibold text-[#e6edf3]">
                <Code2 className="w-3.5 h-3.5 text-[#58a6ff]" />
                <span>Preferred Language</span>
              </label>
              <span className="text-[10px] font-mono text-[#58a6ff] bg-[#0d1117] px-2 py-0.5 rounded border border-[#30363d]">
                {selectedLanguage === 'cpp' ? 'C++' : selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}
              </span>
            </div>
            <p className="text-[#8b949e] text-[11px] leading-relaxed">
              Default programming language applied across code notes, practice editor, and AI tutor explanations.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {[
                { id: 'javascript', label: 'JavaScript', badge: 'JS' },
                { id: 'python', label: 'Python', badge: 'PY' },
                { id: 'java', label: 'Java', badge: 'JAVA' },
                { id: 'cpp', label: 'C++', badge: 'C++' }
              ].map((lang) => {
                const isSelected = selectedLanguage === lang.id;
                return (
                  <button
                    key={lang.id}
                    id={`settings-lang-${lang.id}`}
                    type="button"
                    onClick={() => setSelectedLanguage(lang.id as SupportedLanguage)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#58a6ff]/15 border-[#58a6ff] text-[#e6edf3] shadow-sm font-semibold'
                        : 'bg-[#0d1117] border-[#30363d] text-[#8b949e] hover:text-[#e6edf3] hover:border-[#8b949e]/50 hover:bg-[#21262d]'
                    }`}
                  >
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded mb-1 ${
                      isSelected ? 'bg-[#58a6ff] text-[#0d1117]' : 'bg-[#21262d] text-[#8b949e]'
                    }`}>
                      {lang.badge}
                    </span>
                    <span>{lang.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes Content Language Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 font-semibold text-[#e6edf3]">
                <Languages className="w-3.5 h-3.5 text-[#3fb950]" />
                <span>Notes Content Language</span>
              </label>
              <span className="text-[10px] font-mono text-[#3fb950] bg-[#0d1117] px-2 py-0.5 rounded border border-[#30363d]">
                {contentLanguage === 'hinglish' ? 'Hinglish' : 'English'}
              </span>
            </div>
            <p className="text-[#8b949e] text-[11px] leading-relaxed">
              Explanatory notes written language across topics. Code snippets continue to respect your preferred programming language.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { 
                  id: 'en', 
                  label: 'English', 
                  desc: 'Standard technical terms & explanations',
                  badge: 'EN'
                },
                { 
                  id: 'hinglish', 
                  label: 'Hinglish', 
                  desc: 'Natural Hindi-English mix in Latin script',
                  badge: 'HINGLISH'
                }
              ].map((item) => {
                const isSelected = contentLanguage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`settings-content-lang-${item.id}`}
                    type="button"
                    onClick={() => setContentLanguage(item.id as ContentLanguage)}
                    className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#3fb950]/15 border-[#3fb950] text-[#e6edf3] shadow-xs'
                        : 'bg-[#0d1117] border-[#30363d] text-[#8b949e] hover:text-[#e6edf3] hover:border-[#8b949e]/50 hover:bg-[#21262d]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs font-semibold text-[#e6edf3]">{item.label}</span>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        isSelected ? 'bg-[#3fb950] text-[#0d1117]' : 'bg-[#21262d] text-[#8b949e]'
                      }`}>
                        {item.badge}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#8b949e] leading-snug">{item.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editor Font Size */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-1.5 font-semibold text-[#e6edf3]">
                <Terminal className="w-3.5 h-3.5 text-[#e3b341]" />
                <span>Editor Font Size</span>
              </label>
              <span className="font-mono text-[#8b949e]">{fontSize}px</span>
            </div>
            <input
              id="range-font-size"
              type="range"
              min="11"
              max="18"
              step="1"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-[#58a6ff] cursor-pointer"
            />
          </div>

          {/* User Profile info */}
          <div className="p-3 bg-[#0d1117] rounded-lg border border-[#30363d]/60 space-y-1">
            <div className="text-[11px] font-semibold text-[#e6edf3]">
              Logged in as: {user?.name || 'Rohan Agarwal'}
            </div>
            <div className="text-[10px] text-[#8b949e] font-mono">
              {user?.email || 'rohanagarwal082005@gmail.com'}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#30363d]">
            <button
              type="button"
              onClick={() => setIsSettingsOpen(false)}
              className="px-3.5 py-1.5 rounded text-xs text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#1c2128] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="btn-save-settings"
              type="submit"
              className="px-4 py-1.5 rounded bg-[#58a6ff] hover:bg-[#388bfd] text-[#0d1117] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
