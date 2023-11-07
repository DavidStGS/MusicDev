import { create } from "zustand";

interface PlaterProps{
    ids: string[];
    activateId?: string;
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    reset: () => void; 
}

// create a custom hook to manage the player state
const usePlayer = create<PlaterProps>((set  ) => ({
    ids: [],
    activateId: undefined,
    setId: (id: string) => set({activateId: id}),
    setIds: (ids: string[]) => set({ids: ids}),
    reset: () => set({ids: [], activateId: undefined})         
}))

export default usePlayer;
