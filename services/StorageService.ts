import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserState, VibeCategory } from '../types';

const STORAGE_KEYS = {
  USER_STATE: 'user_state',
  QUOTE_HISTORY: 'quote_history',
} as const;

const DEFAULT_USER_STATE: UserState = {
  isPro: false,
  selectedVibe: 'motivational',
  dailyQuoteCount: 0,
  lastQuoteDate: '',
  currentQuote: null,
};

export class StorageService {
  static async getUserState(): Promise<UserState> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.USER_STATE);
      if (stored) {
        return { ...DEFAULT_USER_STATE, ...JSON.parse(stored) };
      }
      return DEFAULT_USER_STATE;
    } catch (error) {
      console.error('Error getting user state:', error);
      return DEFAULT_USER_STATE;
    }
  }

  static async saveUserState(userState: Partial<UserState>): Promise<void> {
    try {
      const currentState = await this.getUserState();
      const newState = { ...currentState, ...userState };
      await AsyncStorage.setItem(STORAGE_KEYS.USER_STATE, JSON.stringify(newState));
    } catch (error) {
      console.error('Error saving user state:', error);
    }
  }

  static async updateSelectedVibe(vibe: VibeCategory): Promise<void> {
    await this.saveUserState({ selectedVibe: vibe });
  }

  static async incrementDailyQuoteCount(): Promise<void> {
    const currentState = await this.getUserState();
    const today = new Date().toDateString();
    
    // Reset count if it's a new day
    if (currentState.lastQuoteDate !== today) {
      await this.saveUserState({
        dailyQuoteCount: 1,
        lastQuoteDate: today,
      });
    } else {
      await this.saveUserState({
        dailyQuoteCount: currentState.dailyQuoteCount + 1,
      });
    }
  }

  static async canGetNewQuote(isPro: boolean): Promise<boolean> {
    if (isPro) return true;
    
    const currentState = await this.getUserState();
    const today = new Date().toDateString();
    
    // Reset if new day
    if (currentState.lastQuoteDate !== today) {
      return true;
    }
    
    // Free users get 1 quote per day
    return currentState.dailyQuoteCount < 1;
  }

  static async saveCurrentQuote(quote: any): Promise<void> {
    await this.saveUserState({ currentQuote: quote });
  }

  static async clearUserData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER_STATE,
        STORAGE_KEYS.QUOTE_HISTORY,
      ]);
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  }
}