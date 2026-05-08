import { create } from 'zustand';
import { calculateDistance } from '@/lib/utils';
import axios from 'axios';

export interface IssPosition {
  lat: number;
  lng: number;
  timestamp: number;
  speed?: number;
}

export interface Astronaut {
  name: string;
  craft: string;
}

interface IssState {
  positions: IssPosition[];
  astronauts: Astronaut[];
  isLoading: boolean;
  error: string | null;
  fetchIssLocation: () => Promise<void>;
  fetchAstronauts: () => Promise<void>;
}

export const useIssStore = create<IssState>((set, get) => ({
  positions: [],
  astronauts: [],
  isLoading: false,
  error: null,
  
  fetchIssLocation: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await axios.get('/api/iss');
      const data = res.data;
      
      const newPos: IssPosition = {
        lat: parseFloat(data.iss_position.latitude),
        lng: parseFloat(data.iss_position.longitude),
        timestamp: data.timestamp * 1000,
      };

      const { positions } = get();
      
      if (positions.length > 0) {
        const lastPos = positions[positions.length - 1];
        const distance = calculateDistance(lastPos.lat, lastPos.lng, newPos.lat, newPos.lng);
        const timeDiffHours = (newPos.timestamp - lastPos.timestamp) / (1000 * 60 * 60);
        
        if (timeDiffHours > 0) {
          newPos.speed = distance / timeDiffHours;
        } else {
          newPos.speed = lastPos.speed || 27600; // default approximate speed
        }
      } else {
        newPos.speed = 27600; // initial default speed
      }

      set((state) => ({
        positions: [...state.positions.slice(-14), newPos], // keep last 15
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to fetch ISS location', isLoading: false });
    }
  },

  fetchAstronauts: async () => {
    try {
      const res = await axios.get('/api/astronauts');
      set({ astronauts: res.data.people.filter((p: any) => p.craft === 'ISS') });
    } catch (error) {
      console.error('Failed to fetch astronauts', error);
    }
  }
}));
