import { create } from 'zustand';

export type DashboardTab = 'overview' | 'analytics' | 'news';

interface UiState {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
}

export const useUiStore = create<UiState>((set) => ({
  activeTab: 'overview',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
