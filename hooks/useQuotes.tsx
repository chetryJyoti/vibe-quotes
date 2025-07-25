import { useState, useEffect } from 'react';
import { Quote, VibeCategory, UserState } from '../types';
import { QuoteService } from '../services/QuoteService';
import { StorageService } from '../services/StorageService';

export const useQuotes = (isPro: boolean) => {
  const [userState, setUserState] = useState<UserState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUserState();
  }, []);

  const loadUserState = async () => {
    try {
      setIsLoading(true);
      const state = await StorageService.getUserState();
      setUserState(state);
      
      // If no current quote, get a random one
      if (!state.currentQuote) {
        const randomQuote = QuoteService.getRandomQuote(state.selectedVibe);
        if (randomQuote) {
          await StorageService.saveCurrentQuote(randomQuote);
          setUserState(prev => prev ? { ...prev, currentQuote: randomQuote } : null);
        }
      }
    } catch (err) {
      setError('Failed to load quotes');
      console.error('Error loading user state:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getNewQuote = async (): Promise<boolean> => {
    if (!userState) return false;

    try {
      const canGet = await StorageService.canGetNewQuote(isPro);
      if (!canGet) {
        setError('Daily quote limit reached. Upgrade to Pro for unlimited quotes!');
        return false;
      }

      const newQuote = QuoteService.getRandomQuoteExcluding(
        userState.selectedVibe,
        userState.currentQuote?.id || ''
      );

      if (!newQuote) {
        setError('No more quotes available for this vibe');
        return false;
      }

      // Update storage
      await StorageService.incrementDailyQuoteCount();
      await StorageService.saveCurrentQuote(newQuote);

      // Update state
      setUserState(prev => prev ? { ...prev, currentQuote: newQuote } : null);
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to get new quote');
      console.error('Error getting new quote:', err);
      return false;
    }
  };

  const changeVibe = async (newVibe: VibeCategory) => {
    if (!userState) return;

    try {
      const randomQuote = QuoteService.getRandomQuote(newVibe);
      if (randomQuote) {
        await StorageService.updateSelectedVibe(newVibe);
        await StorageService.saveCurrentQuote(randomQuote);
        
        setUserState(prev => prev ? {
          ...prev,
          selectedVibe: newVibe,
          currentQuote: randomQuote
        } : null);
        setError(null);
      }
    } catch (err) {
      setError('Failed to change vibe');
      console.error('Error changing vibe:', err);
    }
  };

  const clearError = () => setError(null);

  return {
    userState,
    isLoading,
    error,
    getNewQuote,
    changeVibe,
    clearError,
    refreshState: loadUserState,
  };
};