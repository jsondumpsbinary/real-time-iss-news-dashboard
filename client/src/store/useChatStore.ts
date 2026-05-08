import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { useIssStore } from './useIssStore';
import { useNewsStore } from './useNewsStore';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  toggleChat: () => void;
  clearChat: () => void;
  sendMessage: (content: string) => Promise<void>;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      isOpen: false,
      isLoading: false,

      toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
      
      clearChat: () => set({ messages: [] }),

      sendMessage: async (content: string) => {
        const newMessage: ChatMessage = {
          id: Math.random().toString(36).substring(7),
          role: 'user',
          content,
          timestamp: Date.now()
        };

        set((state) => ({
          messages: [...state.messages.slice(-29), newMessage], // keep last 30
          isLoading: true
        }));

        try {
          const issState = useIssStore.getState();
          const newsState = useNewsStore.getState();

          const issContext = {
            currentPosition: issState.positions[issState.positions.length - 1],
            astronauts: issState.astronauts
          };

          const newsContext = {
            category: newsState.category,
            topArticles: newsState.articles.slice(0, 5).map(a => ({
              title: a.title,
              source: a.source.name
            }))
          };

          const res = await axios.post('/api/chat', {
            message: content,
            issContext,
            newsContext
          });

          const assistantMessage: ChatMessage = {
            id: Math.random().toString(36).substring(7),
            role: 'assistant',
            content: res.data.response,
            timestamp: Date.now()
          };

          set((state) => ({
            messages: [...state.messages, assistantMessage],
            isLoading: false
          }));

        } catch (error) {
          const errorMessage: ChatMessage = {
            id: Math.random().toString(36).substring(7),
            role: 'assistant',
            content: 'Sorry, I encountered an error. Please try again.',
            timestamp: Date.now()
          };
          
          set((state) => ({
            messages: [...state.messages, errorMessage],
            isLoading: false
          }));
        }
      }
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({ messages: state.messages }),
    }
  )
);
