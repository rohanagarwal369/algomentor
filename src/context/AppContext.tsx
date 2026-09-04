import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { DSATopic, UserProfile, AppSettings, ChatMessage, SupportedLanguage, ContentLanguage } from '../types';
import { DSA_TOPICS, INITIAL_CHAT_MESSAGES } from '../data/dsaTopics';
import { calculateDSAProgress, DSAProgressReport } from '../utils/dsaProgress';

interface AppContextType {
  user: UserProfile | null;
  login: (email: string, name?: string) => void;
  loginWithGoogle: () => void;
  logout: () => void;
  topics: DSATopic[];
  activeTopicId: string;
  activeTopic: DSATopic;
  setActiveTopicId: (id: string) => void;
  toggleTopicCompletion: (id: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  // Code Practice
  selectedLanguage: SupportedLanguage;
  setSelectedLanguage: (lang: SupportedLanguage) => void;
  contentLanguage: ContentLanguage;
  setContentLanguage: (lang: ContentLanguage) => void;
  currentCode: string;
  setCurrentCode: (code: string) => void;
  resetCode: () => void;
  isRunningCode: boolean;
  testResult: {
    status: 'idle' | 'running' | 'accepted' | 'wrong';
    runtime?: string;
    memory?: string;
    message?: string;
    testsPassed?: string;
  };
  runCode: () => void;
  submitCode: () => void;
  // Chat / AI Tutor
  messages: ChatMessage[];
  sendMessage: (text: string) => void;
  isAiTyping: boolean;
  // Progressive Hint
  hintLevel: number;
  requestNextHint: () => void;
  setHintLevel: (level: number) => void;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  // Active right tab for responsive/split mode
  activeRightTab: 'split' | 'practice' | 'chat';
  setActiveRightTab: (tab: 'split' | 'practice' | 'chat') => void;
  // Overall DSA Progress Report
  dsaProgress: DSAProgressReport;
}

const DEFAULT_USER: UserProfile = {
  name: 'Rohan Agarwal',
  email: 'rohanagarwal082005@gmail.com',
  initials: 'RA',
  streakDays: 7,
  completedTopicIds: ['linked-list', 'arrays', 'stacks'],
  solvedProblemIds: ['reverse-linked-list', 'valid-parentheses', 'two-sum-ii'],
  solvedProblemsCount: 3,
  totalSubmissions: 4,
  acceptedSubmissions: 3,
  quizScores: {
    'linked-list': 2,
    'arrays': 2,
    'stacks': 2,
    'queues': 1,
    'sorting': 2,
    'searching': 2
  },
  quizAttempts: {
    'linked-list': { correct: 2, total: 2 },
    'arrays': { correct: 2, total: 2 },
    'stacks': { correct: 2, total: 2 },
    'queues': { correct: 1, total: 2 },
    'sorting': { correct: 2, total: 2 },
    'searching': { correct: 2, total: 2 }
  }
};

const DEFAULT_SETTINGS: AppSettings = {
  geminiApiKey: '',
  model: 'gemini-2.5-flash',
  editorFontSize: 13,
  theme: 'dark',
  preferredLanguage: 'javascript',
  contentLanguage: 'en'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User Profile state with localStorage persistence
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('algomentor_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_USER,
          ...parsed,
          completedTopicIds: parsed.completedTopicIds ?? DEFAULT_USER.completedTopicIds,
          solvedProblemIds: parsed.solvedProblemIds ?? DEFAULT_USER.solvedProblemIds,
          solvedProblemsCount: parsed.solvedProblemsCount ?? DEFAULT_USER.solvedProblemsCount,
          totalSubmissions: parsed.totalSubmissions ?? DEFAULT_USER.totalSubmissions,
          acceptedSubmissions: parsed.acceptedSubmissions ?? DEFAULT_USER.acceptedSubmissions,
          quizAttempts: parsed.quizAttempts ?? DEFAULT_USER.quizAttempts
        };
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_USER;
  });

  // Settings with localStorage persistence
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('algomentor_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_SETTINGS;
  });

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('algomentor_theme');
    if (saved) return saved === 'dark';
    return true; // Default Elegant Dark
  });

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Topics - strictly synchronized with user completedTopicIds
  const [topics, setTopics] = useState<DSATopic[]>(() => {
    const savedUser = localStorage.getItem('algomentor_user');
    let completedIds: string[] = DEFAULT_USER.completedTopicIds;
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (Array.isArray(parsed?.completedTopicIds)) {
          completedIds = parsed.completedTopicIds.map((id: string) => id === 'dp' ? 'dynamic-programming' : id);
        }
      } catch {
        // use default
      }
    }
    return DSA_TOPICS.map(t => ({
      ...t,
      completed: completedIds.includes(t.id)
    }));
  });
  const [activeTopicId, setActiveTopicId] = useState<string>('linked-list');
  const activeTopic = topics.find(t => t.id === activeTopicId) || topics[0];

  // Editor and Practice states
  const [selectedLanguage, setSelectedLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('algomentor_preferred_language') as SupportedLanguage | null;
    if (saved && ['javascript', 'python', 'java', 'cpp'].includes(saved)) {
      return saved;
    }
    const userPref = localStorage.getItem('algomentor_user');
    if (userPref) {
      try {
        const parsed = JSON.parse(userPref);
        if (parsed?.preferredLanguage && ['javascript', 'python', 'java', 'cpp'].includes(parsed.preferredLanguage)) {
          return parsed.preferredLanguage;
        }
      } catch {
        // ignore
      }
    }
    return 'javascript';
  });

  const setSelectedLanguage = (lang: SupportedLanguage) => {
    setSelectedLanguageState(lang);
    localStorage.setItem('algomentor_preferred_language', lang);
    setSettings(prev => {
      const merged = { ...prev, preferredLanguage: lang };
      localStorage.setItem('algomentor_settings', JSON.stringify(merged));
      return merged;
    });
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, preferredLanguage: lang };
      localStorage.setItem('algomentor_user', JSON.stringify(updated));
      return updated;
    });
  };

  // Content Language (English / Hinglish) state with localStorage persistence
  const [contentLanguage, setContentLanguageState] = useState<ContentLanguage>(() => {
    const saved = localStorage.getItem('algomentor_content_language') as ContentLanguage | null;
    if (saved && (saved === 'en' || saved === 'hinglish')) {
      return saved;
    }
    const userPref = localStorage.getItem('algomentor_user');
    if (userPref) {
      try {
        const parsed = JSON.parse(userPref);
        if (parsed?.contentLanguage && (parsed.contentLanguage === 'en' || parsed.contentLanguage === 'hinglish')) {
          return parsed.contentLanguage;
        }
      } catch {
        // ignore
      }
    }
    const settingsPref = localStorage.getItem('algomentor_settings');
    if (settingsPref) {
      try {
        const parsed = JSON.parse(settingsPref);
        if (parsed?.contentLanguage && (parsed.contentLanguage === 'en' || parsed.contentLanguage === 'hinglish')) {
          return parsed.contentLanguage;
        }
      } catch {
        // ignore
      }
    }
    return 'en';
  });

  const setContentLanguage = (lang: ContentLanguage) => {
    setContentLanguageState(lang);
    localStorage.setItem('algomentor_content_language', lang);
    setSettings(prev => {
      const merged = { ...prev, contentLanguage: lang };
      localStorage.setItem('algomentor_settings', JSON.stringify(merged));
      return merged;
    });
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, contentLanguage: lang };
      localStorage.setItem('algomentor_user', JSON.stringify(updated));
      return updated;
    });
  };

  const [currentCode, setCurrentCode] = useState<string>(
    activeTopic.practiceProblem.starterCode[selectedLanguage] || activeTopic.practiceProblem.starterCode.javascript
  );

  // Update current code when topic or language changes
  useEffect(() => {
    if (activeTopic.practiceProblem.starterCode[selectedLanguage]) {
      setCurrentCode(activeTopic.practiceProblem.starterCode[selectedLanguage]);
    }
  }, [activeTopicId, selectedLanguage]);

  const [isRunningCode, setIsRunningCode] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{
    status: 'idle' | 'running' | 'accepted' | 'wrong';
    runtime?: string;
    memory?: string;
    message?: string;
    testsPassed?: string;
  }>({
    status: 'accepted',
    runtime: '52 ms (Beats 91.4% of users)',
    memory: '43.2 MB (Beats 84.1% of users)',
    message: 'All test cases passed successfully! Optimal pointer rearrangement O(n) runtime and O(1) space.',
    testsPassed: '32 / 32 test cases passed'
  });

  // Chat messages
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const topicChat = INITIAL_CHAT_MESSAGES['linked-list'] || [];
    return topicChat.map((m, idx) => ({
      id: `init-${idx}`,
      sender: m.sender,
      text: m.text,
      timestamp: 'Just now',
      screenContext: 'Linked List'
    }));
  });
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);
  const [activeRightTab, setActiveRightTab] = useState<'split' | 'practice' | 'chat'>('split');
  const [hintLevel, setHintLevel] = useState<number>(1);

  // Reset hint level on topic change
  useEffect(() => {
    setHintLevel(1);
  }, [activeTopicId]);

  // Sync theme with HTML root class & localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      localStorage.setItem('algomentor_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
      localStorage.setItem('algomentor_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // Login handler
  const login = (email: string, name?: string) => {
    // TODO: backend - authenticating user with backend API
    const initials = (name || email.split('@')[0])
      .split(' ')
      .map(part => part[0]?.toUpperCase() || '')
      .join('')
      .slice(0, 2) || 'AM';

    const newUser: UserProfile = {
      name: name || 'DSA Learner',
      email,
      initials: initials || 'AL',
      streakDays: 7,
      completedTopicIds: ['arrays', 'linked-list', 'stacks'],
      solvedProblemIds: ['reverse-linked-list', 'valid-parentheses']
    };

    setUser(newUser);
    localStorage.setItem('algomentor_user', JSON.stringify(newUser));
  };

  const loginWithGoogle = () => {
    // TODO: backend - integrate Google OAuth 2.0 flow
    const googleUser: UserProfile = {
      name: 'Rohan Agarwal',
      email: 'rohanagarwal082005@gmail.com',
      initials: 'RA',
      streakDays: 7,
      completedTopicIds: ['arrays', 'linked-list', 'stacks'],
      solvedProblemIds: ['reverse-linked-list', 'valid-parentheses']
    };
    setUser(googleUser);
    localStorage.setItem('algomentor_user', JSON.stringify(googleUser));
  };

  const logout = () => {
    // TODO: backend - invalidate session token
    setUser(null);
    localStorage.removeItem('algomentor_user');
  };

  const toggleTopicCompletion = (id: string) => {
    setTopics(prev => {
      const nextTopics = prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
      const activeCompletedIds = nextTopics.filter(t => t.completed).map(t => t.id);
      setUser(prevUser => {
        if (!prevUser) return prevUser;
        const updatedUser = { ...prevUser, completedTopicIds: activeCompletedIds };
        localStorage.setItem('algomentor_user', JSON.stringify(updatedUser));
        return updatedUser;
      });
      return nextTopics;
    });
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    // TODO: backend - persist user preferences and masked API key
    if (newSettings.contentLanguage && (newSettings.contentLanguage === 'en' || newSettings.contentLanguage === 'hinglish')) {
      setContentLanguageState(newSettings.contentLanguage);
      localStorage.setItem('algomentor_content_language', newSettings.contentLanguage);
    }
    if (newSettings.preferredLanguage && ['javascript', 'python', 'java', 'cpp'].includes(newSettings.preferredLanguage)) {
      setSelectedLanguageState(newSettings.preferredLanguage);
      localStorage.setItem('algomentor_preferred_language', newSettings.preferredLanguage);
    }
    setSettings(prev => {
      const merged = { ...prev, ...newSettings };
      localStorage.setItem('algomentor_settings', JSON.stringify(merged));
      return merged;
    });
  };

  const resetCode = () => {
    setCurrentCode(activeTopic.practiceProblem.starterCode[selectedLanguage]);
  };

  const runCode = () => {
    // TODO: backend - execute candidate code against sample test cases in sandbox
    setIsRunningCode(true);
    setTestResult({ status: 'running' });

    setTimeout(() => {
      setIsRunningCode(false);
      setTestResult({
        status: 'accepted',
        runtime: '48 ms',
        memory: '42.8 MB',
        message: 'Sample test cases passed: Output matches expected results.',
        testsPassed: '3 / 3 test cases passed'
      });
    }, 600);
  };

  const submitCode = () => {
    // TODO: backend - evaluate all hidden test cases in sandbox judge
    setIsRunningCode(true);
    setTestResult({ status: 'running' });

    setTimeout(() => {
      setIsRunningCode(false);
      setTestResult({
        status: 'accepted',
        runtime: '52 ms (Beats 91.4% of submissions)',
        memory: '43.2 MB (Beats 84.1% of submissions)',
        message: `Accepted! Your solution for "${activeTopic.practiceProblem.title}" passed all test cases with optimal time and space complexity.`,
        testsPassed: '32 / 32 test cases passed'
      });

      // Mark problem as solved and record submission accuracy
      setUser(prev => {
        if (!prev) return prev;
        const alreadySolved = prev.solvedProblemIds.includes(activeTopic.practiceProblem.id);
        const updatedSolved = alreadySolved 
          ? prev.solvedProblemIds 
          : [...prev.solvedProblemIds, activeTopic.practiceProblem.id];
        const updated = {
          ...prev,
          solvedProblemIds: updatedSolved,
          solvedProblemsCount: (prev.solvedProblemsCount || 0) + 1,
          totalSubmissions: (prev.totalSubmissions || 0) + 1,
          acceptedSubmissions: (prev.acceptedSubmissions || 0) + 1
        };
        localStorage.setItem('algomentor_user', JSON.stringify(updated));
        return updated;
      });
    }, 850);
  };

  const requestNextHint = () => {
    const nextLvl = Math.min(5, hintLevel + 1);
    setHintLevel(nextLvl);
    sendMessage(`Please give me Level ${nextLvl} Hint for ${activeTopic.title}.`);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now',
      screenContext: activeTopic.title
    };

    setMessages(prev => [...prev, userMsg]);
    setIsAiTyping(true);

    // TODO: backend - stream real response from Gemini API with activeTopic & currentCode context
    setTimeout(() => {
      let aiResponseText = '';
      const lower = text.toLowerCase();

      // Check for progressive hint requests (Levels 1 to 5)
      const isHintRequest = lower.includes('hint') || lower.includes('level 1') || lower.includes('level 2') || lower.includes('level 3') || lower.includes('level 4') || lower.includes('level 5');
      if (isHintRequest) {
        let requestedLevel = hintLevel;
        if (lower.includes('level 1')) requestedLevel = 1;
        else if (lower.includes('level 2')) requestedLevel = 2;
        else if (lower.includes('level 3')) requestedLevel = 3;
        else if (lower.includes('level 4')) requestedLevel = 4;
        else if (lower.includes('level 5') || lower.includes('solution')) requestedLevel = 5;

        setHintLevel(requestedLevel);
        const hintObj = activeTopic.hints?.find(h => h.level === requestedLevel) || activeTopic.hints?.[requestedLevel - 1];

        if (hintObj) {
          aiResponseText = `💡 **${hintObj.title}**\n\n${hintObj.content}`;
          if (requestedLevel < 5) {
            aiResponseText += `\n\n*Take a few minutes to apply this thought to your code before asking for Level ${requestedLevel + 1}!*`;
          } else {
            aiResponseText += `\n\n*This is the optimal reference solution. Study how the invariants preserve O(1) auxiliary space and handle edge terminations.*`;
          }
        } else {
          aiResponseText = `💡 **Hint Level ${requestedLevel}**\n\nFocus on the core invariant: ${activeTopic.keyConcept.description}`;
        }
      } else if (lower.includes('simple') || lower.includes('eli5') || lower.includes('layman') || lower.includes('analogy')) {
        // Simple terms / ELI5 explanations
        if (activeTopic.id === 'linked-list') {
          aiResponseText = `🧩 **${activeTopic.title} Explained in Simple Terms (The Scavenger Hunt Analogy)**:\n\nImagine a treasure hunt where every clue card has a message AND a slip of paper telling you where the *next* clue is hidden.\n\n• **Head**: The first clue in your pocket.\n• **Nodes**: Each clue card.\n• **Pointers**: The slip telling you where to run next.\n• **Null**: The last clue that says "You found the treasure! Nothing more."\n\n**Reversing it** is simply turning all the directional arrows backwards so the hunt leads from the treasure back to the start!`;
        } else if (activeTopic.id === 'arrays') {
          aiResponseText = `🧩 **${activeTopic.title} Explained in Simple Terms (The Numbered Lockers)**:\n\nImagine a long hallway of physical lockers numbered 0 to 999. If I say "look in locker #42", you walk directly to locker 42 in 1 step (that's **O(1) instant access**!).\n\nIn **Two Sum on sorted lockers**, if locker 0 and locker 999 add up to more than your target, you don't check locker 999 anymore—you try locker 998!`;
        } else if (activeTopic.id === 'stacks') {
          aiResponseText = `🧩 **${activeTopic.title} Explained in Simple Terms (The Cafeteria Trays)**:\n\nThink of a spring-loaded stack of trays in a lunch cafeteria:\n• **Push**: Putting a clean tray right on top.\n• **Pop**: Taking the topmost tray off.\n• You can NEVER pull from the bottom without removing everything on top first (**Last-In, First-Out**)!\n\nThis is why your browser's "Back" button and bracket matchers use stacks.`;
        } else {
          aiResponseText = `🧩 **${activeTopic.title} in Plain English**:\n\nThink of ${activeTopic.title} as an organized method to store and manipulate items predictably.\n\nKey advantage: ${activeTopic.keyConcept.description}`;
        }
      } else if (lower.includes('hinglish') || lower.includes('hindi')) {
        // Hinglish explanation
        if (activeTopic.id === 'linked-list') {
          aiResponseText = `🇮🇳 **${activeTopic.title} (Hinglish Explanation)**:\n\nDekho bhai, Linked List ko reverse karna ekdum straightforward hai agar pointer ko physical arrow jaisa imagine karo!\n\n1. **Kyu zaroorat hai?**: Array me elements memory me sath-sath baithe hote hain, but Linked List me nodes poore RAM me dispersed hote hain. Har node bas agle wale ka address janta hai.\n2. **Reverse karte waqt main mistake**: Agar tum direct \`curr.next = prev\` kar doge, toh aage ki list ka connection toot jayega!\n3. **Golden Rule**: Pehle \`nextTemp = curr.next\` me aage wale ka address tijori me save karo. Fir pointer piche ghumaao (\`curr.next = prev\`), fir \`prev\` aur \`curr\` ko ek-ek kadam aage badhao!`;
        } else {
          aiResponseText = `🇮🇳 **${activeTopic.title} (Hinglish Concept)**:\n\nSimple bhasha me: ${activeTopic.title} ka main goal hai data ko aise organize karna taaki search ya insert super fast ho sake.\n\nIska core idea: ${activeTopic.keyConcept.description}.\n\nPractice editor me code likho aur test cases run karke dekho!`;
        }
      } else if (lower.includes('mistake') || lower.includes('bug') || lower.includes('error') || lower.includes('check my code') || lower.includes('review')) {
        // Code analysis of currentCode in editor
        const code = currentCode;
        const hasWhile = code.includes('while') || code.includes('for');
        const hasReturn = code.includes('return');
        const hasNullCheck = code.includes('null') || code.includes('None') || code.includes('nullptr');

        aiResponseText = `🔍 **Code Review & Mistake Analysis**:\n\nLooking at your active ${selectedLanguage.toUpperCase()} code in the editor:\n\n`;

        if (!hasReturn) {
          aiResponseText += `⚠️ **Missing Return Statement**: Make sure your function explicitly returns the result!\n`;
        }
        if (!hasNullCheck && activeTopic.id === 'linked-list') {
          aiResponseText += `⚠️ **Boundary Check**: Always verify the base case when \`head === null\` or has only 1 node to prevent null reference errors.\n`;
        }
        if (code.includes('curr.next = prev') && !code.includes('nextTemp') && !code.includes('next_node') && !code.includes('nxt')) {
          aiResponseText += `🚨 **Pointer Loss Detected**: You are reassigning \`curr.next = prev\` without preserving the upcoming node reference first! Save \`curr.next\` before overwriting it.\n`;
        } else {
          aiResponseText += `✅ **Structure Check**: Your control flow (\`${hasWhile ? 'Loop Invariant Present' : 'Recursion/Iteration'}\`) is aligned with the standard approach.\n\n`;
          aiResponseText += `💡 **Pro-Tip**: Click **"Run Code"** to verify sample test cases, or **"Submit"** to test against all edge cases!`;
        }
      } else if (lower.includes('complexity') || lower.includes('time') || lower.includes('space') || lower.includes('big o')) {
        aiResponseText = `⏱️ **Complexity Analysis for ${activeTopic.title}**:\n\n• **Time Complexity**: \`${activeTopic.complexity.time}\`\n• **Space Complexity**: \`${activeTopic.complexity.space}\`\n\n**Intuition**: ${activeTopic.complexityDetail?.whyTime || activeTopic.complexity.notes}\n\nCheck out the **Complexity Visualizer** in the center panel for the interactive Big-O input size slider!`;
      } else {
        aiResponseText = `Regarding **${activeTopic.title}**:\n\n${activeTopic.keyConcept.title} — ${activeTopic.keyConcept.description}.\n\nTry using the **Context Actions** above (like *Progressive Hint*, *Explain in Simple Terms*, or *Review My Code*) to guide your learning step by step!`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'gemini',
        text: aiResponseText,
        timestamp: 'Just now',
        screenContext: activeTopic.title,
        hintLevel: isHintRequest ? hintLevel : undefined
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsAiTyping(false);
    }, 600);
  };


  // Compute overall DSA progress from real user activity
  const dsaProgress = useMemo(() => {
    return calculateDSAProgress(user, topics, activeTopicId);
  }, [user, topics, activeTopicId]);

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        loginWithGoogle,
        logout,
        topics,
        activeTopicId,
        activeTopic,
        setActiveTopicId,
        toggleTopicCompletion,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        isSettingsOpen,
        setIsSettingsOpen,
        settings,
        updateSettings,
        selectedLanguage,
        setSelectedLanguage,
        contentLanguage,
        setContentLanguage,
        currentCode,
        setCurrentCode,
        resetCode,
        isRunningCode,
        testResult,
        runCode,
        submitCode,
        messages,
        sendMessage,
        isAiTyping,
        hintLevel,
        requestNextHint,
        setHintLevel,
        setUser,
        isDarkMode,
        toggleDarkMode,
        activeRightTab,
        setActiveRightTab,
        dsaProgress
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
