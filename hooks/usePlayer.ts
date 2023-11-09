import { create } from 'zustand';

interface PlayerStore {
  ids: string[];
  activedId?: string;
  currentDuration: number;
  totalDuration: number;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  setCurrentDuration: (duration: number) => void;
  setTotalDuration: (duration: number) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activedId: undefined,
  currentDuration: 0,
  totalDuration: 0,
  setId: (id: string) => set({ activedId: id }),
  setIds: (ids: string[]) => set({ ids }),
  setCurrentDuration: (duration: number) => set({ currentDuration: duration }),
  setTotalDuration: (duration: number) => set({ totalDuration: duration }),
  reset: () => set({ ids: [], activedId: undefined, currentDuration: 0, totalDuration: 0 })
}));

export default usePlayer;