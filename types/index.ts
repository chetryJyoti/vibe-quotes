export interface Quote {
  id: string;
  text: string;
  author: string;
  backgroundImage: string;
  category: VibeCategory;
}

export type VibeCategory = 'motivational' | 'emotional' | 'calm' | 'feelGood';

export interface Vibe {
  id: VibeCategory;
  name: string;
  emoji: string;
  color: string;
  isPro: boolean;
}

export interface UserState {
  isPro: boolean;
  selectedVibe: VibeCategory;
  dailyQuoteCount: number;
  lastQuoteDate: string;
  currentQuote: Quote | null;
}

export interface SubscriptionState {
  isPro: boolean;
  isLoading: boolean;
  error: string | null;
}