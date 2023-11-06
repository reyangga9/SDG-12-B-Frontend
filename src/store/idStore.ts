import create, { SetState } from 'zustand';

interface IdStore {
    id: string | null;
    setId: (newId: string) => void;
}

export const useIdStore = create<IdStore>((set: SetState<IdStore>) => ({
    id: null,
    setId: (newId: string) => set({ id: newId }),
}));
