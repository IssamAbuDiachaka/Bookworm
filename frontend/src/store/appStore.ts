import { create } from "zustand";
import { persist } from "zustand/middleware";

// User type
export interface User {
  id: string;
  name: string;
  role: "student" | "lecturer" | "guest";
  program?: string;
  token?: string;
}

interface AppState {
  theme: "light" | "dark";
  user: User | null;
  loading: boolean;
  error: string | null;

  // Actions
  toggleTheme: () => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "light",
      user: null,
      loading: false,
      error: null,

      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      logout: () => set({ user: null, error: null, loading: false }),
    }),
    {
      name: "bookworm-app-store", // persists state in localStorage
      partialize: (state) => ({
        theme: state.theme,
        user: state.user,
      }),
    }
  )
);
