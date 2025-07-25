import quotesData from "@/data/quotes.json";
import { Quote, VibeCategory } from "@/types";

export class QuoteService {
  private static quotes: Record<VibeCategory, Quote[]> = quotesData;

  static getAllQuotes(): Quote[] {
    return Object.values(this.quotes).flat();
  }

  static getQuotesByVibe(vibe: VibeCategory): Quote[] {
    return this.quotes[vibe] || [];
  }

  static getRandomQuote(vibe: VibeCategory): Quote | null {
    const vibeQuotes = this.getQuotesByVibe(vibe);
    if (vibeQuotes.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * vibeQuotes.length);
    return vibeQuotes[randomIndex];
  }

  static getRandomQuoteExcluding(
    vibe: VibeCategory,
    excludeId: string
  ): Quote | null {
    const vibeQuotes = this.getQuotesByVibe(vibe).filter(
      (quote) => quote.id !== excludeId
    );
    if (vibeQuotes.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * vibeQuotes.length);
    return vibeQuotes[randomIndex];
  }

  static getQuoteById(id: string): Quote | null {
    const allQuotes = this.getAllQuotes();
    return allQuotes.find((quote) => quote.id === id) || null;
  }
}
