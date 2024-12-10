// src/stores/counter.ts
import { create } from "zustand";

interface BaseState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useBaseStore = create<BaseState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useBaseStore;
