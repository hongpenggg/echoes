export enum ViewState {
  HOME = 'HOME',
  LIBRARY = 'LIBRARY',
  QUICK_DEBATE = 'QUICK_DEBATE',
  DEBATE_SESSION = 'DEBATE_SESSION',
  RESULTS = 'RESULTS',
}

export interface Thinker {
  id: string;
  name: string;
  title: string;
  era: string;
  imageUrl: string;
  topics: string[];
  description: string;
  historicalContext: string;
  systemPrompt: string;
  difficulty: 'Novice' | 'Scholar' | 'Grandmaster';
}

export interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: number;
}

export interface Fallacy {
  name: string;
  explanation: string;
  improvement: string;
}

export interface DebateAnalysis {
  summary: {
    userPoint: string;
    aiPoint: string;
    synthesis: string;
  };
  fallacies: Fallacy[];
  sources: string[];
  score: number; // 0 (User winning) to 100 (AI winning), 50 is neutral
  status: 'ongoing' | 'user_victory' | 'ai_victory' | 'stalemate';
  winningInsight?: string;
}

export interface DebateSessionData {
  thinker: Thinker;
  topic: string;
  messages: Message[];
  analysis: DebateAnalysis;
}

export interface ResultData {
  thinkerName: string;
  topic: string;
  outcome: 'victory' | 'defeat' | 'draw';
  finalScore: number; // 0-100
  performance: {
    logic: number;
    evidence: number;
    rhetoric: number;
    creativity: number;
  };
  keyTakeaways: string[];
  strongestPoint: string;
  weakestPoint: string;
}