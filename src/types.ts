export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type SupportedLanguage = 'javascript' | 'python' | 'java' | 'cpp';
export type ContentLanguage = 'en' | 'hinglish';

export interface TopicNotesContent {
  shortDescription: string;
  overview: string[];
  keyConcept: {
    title: string;
    description: string;
  };
  complexityNotes?: string;
}

export interface PracticeProblem {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  exampleInput: string;
  exampleOutput: string;
  constraints: string[];
  starterCode: {
    javascript: string;
    python: string;
    cpp: string;
    java: string;
  };
  sampleSolution: string;
}

export interface VisualizationStep {
  stepIndex: number;
  title: string;
  description: string;
  codeLineHighlight?: number; // 1-indexed line in reference snippet
  pointers?: {
    prev?: number | null | string;
    curr?: number | null | string;
    next?: number | null | string;
    left?: number | null | string;
    right?: number | null | string;
    mid?: number | null | string;
    head?: number | null | string;
    tail?: number | null | string;
    top?: number | null | string;
  };
  // Specific data for each structure
  listNodes?: Array<{
    id: string;
    value: number | string;
    nextId: string | null;
    isCurrent?: boolean;
    isPrev?: boolean;
    isNext?: boolean;
    isHead?: boolean;
  }>;
  arrayElements?: Array<{
    value: number | string;
    index: number;
    state: 'default' | 'active' | 'comparing' | 'sorted' | 'discarded' | 'matched';
  }>;
  stackElements?: Array<{
    value: string | number;
    state: 'default' | 'push' | 'pop' | 'matched' | 'top';
  }>;
  queueElements?: Array<{
    value: string | number;
    index: number;
    isHead?: boolean;
    isTail?: boolean;
    isEmptySlot?: boolean;
  }>;
  treeNodes?: Array<{
    id: string;
    value: number;
    leftId?: string | null;
    rightId?: string | null;
    x: number;
    y: number;
    state: 'default' | 'visiting' | 'visited' | 'current';
  }>;
  graphNodes?: Array<{
    id: string;
    label: string;
    state: 'unvisited' | 'visiting' | 'visited';
    x: number;
    y: number;
  }>;
  gridCells?: Array<Array<{
    value: string | number;
    state: 'water' | 'land' | 'visiting' | 'visited_island';
  }>>;
  dpTable?: Array<{
    index: number;
    label: string;
    value: number | string;
    state: 'empty' | 'computed' | 'current' | 'base';
    formula?: string;
  }>;
  stats?: Record<string, string | number>;
}

export interface VisualizationOperation {
  id: string;
  name: string;
  description: string;
  complexity: string;
  codeSnippet: string;
  steps: VisualizationStep[];
}

export interface VisualizerConfig {
  type: 'linked-list' | 'array' | 'stack' | 'queue' | 'tree' | 'graph' | 'sorting' | 'searching' | 'dp';
  operations: VisualizationOperation[];
}

export interface ProgressiveHint {
  level: 1 | 2 | 3 | 4 | 5;
  title: string;
  content: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ComplexityComparison {
  timeExplanation: string;
  spaceExplanation: string;
  whyTime: string;
  whySpace: string;
  comparisons: Array<{
    operation: string;
    thisStructure: string;
    alternativeStructure: string;
    advantage: string;
  }>;
}

export interface DSATopic {
  id: string;
  title: string;
  category: string;
  iconName: string;
  completed: boolean;
  difficulty: Difficulty;
  shortDescription: string;
  overview: string[];
  keyConcept: {
    title: string;
    description: string;
  };
  complexity: {
    time: string;
    space: string;
    notes: string;
  };
  codeExample: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
    filename?: string;
    language?: string;
    code?: string;
  };
  practiceProblem: PracticeProblem;
  visualizer?: VisualizerConfig;
  hints?: ProgressiveHint[];
  quiz?: QuizQuestion[];
  complexityDetail?: ComplexityComparison;
  notesContent?: {
    en: TopicNotesContent;
    hinglish: TopicNotesContent;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  timestamp: string;
  screenContext?: string;
  codeSnippet?: string;
  hintLevel?: number;
}

export interface UserProfile {
  name: string;
  email: string;
  initials: string;
  streakDays: number;
  completedTopicIds: string[];
  solvedProblemIds: string[];
  solvedProblemsCount?: number;
  quizScores?: Record<string, number>; // topicId -> correct count
  quizAttempts?: Record<string, { total: number; correct: number }>;
  totalSubmissions?: number;
  acceptedSubmissions?: number;
  preferredLanguage?: SupportedLanguage;
  contentLanguage?: ContentLanguage;
}

export interface AppSettings {
  geminiApiKey: string;
  model: string;
  editorFontSize: number;
  theme: 'dark' | 'light' | 'system';
  preferredLanguage?: SupportedLanguage;
  contentLanguage?: ContentLanguage;
}
