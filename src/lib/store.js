import { create } from "zustand";

// Global state for keeping track of initial load, cursor preferences, or admin auth states trivially.
export const useAppStore = create((set) => ({
  hasSeenLoadingScreen: false,
  setHasSeenLoadingScreen: (value) => set({ hasSeenLoadingScreen: value }),

  // Custom cursor configuration
  cursorVariant: "default",
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}));
