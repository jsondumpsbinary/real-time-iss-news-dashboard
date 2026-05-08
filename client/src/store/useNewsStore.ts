import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: { name: string };
  author: string;
  publishedAt: string;
}

interface NewsState {
  articles: Article[];
  category: string;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  setCategory: (category: string) => void;
  fetchNews: (force?: boolean) => Promise<void>;
}

export const useNewsStore = create<NewsState>()(
  persist(
    (set, get) => ({
      articles: [],
      category: 'space',
      isLoading: false,
      error: null,
      lastFetched: null,

      setCategory: (category: string) => {
        set({ category });
        get().fetchNews(true);
      },

      fetchNews: async (force = false) => {
        const { lastFetched, category } = get();
        const now = Date.now();
        
        // Use cached if within 15 minutes and not forced
        if (!force && lastFetched && (now - lastFetched) < 15 * 60 * 1000) {
          return;
        }

        try {
          set({ isLoading: true, error: null });
          const res = await axios.get(`http://localhost:5001/api/news?category=${category}`);
          set({ 
            articles: res.data.articles || [], 
            isLoading: false,
            lastFetched: now
          });
        } catch (error) {
          set({ error: 'Failed to fetch news', isLoading: false });
        }
      }
    }),
    {
      name: 'news-storage', // local storage key
    }
  )
);
