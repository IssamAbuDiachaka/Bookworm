import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "student" | "lecturer";
  token: string;
}

interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

// Persist the auth state (localStorage)
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "bookworm-auth", // localStorage key
      partialize: (state) => ({ user: state.user }), // only persist user
    }
  )
);

// Helper for main.tsx → preload user into memory if available
export const loadAuthFromStorage = () => {
  try {
    const raw = localStorage.getItem("bookworm-auth");
    if (raw) {
      const data = JSON.parse(raw).state?.user;
      return data ?? null;
    }
    return null;
  } catch (err) {
    console.error("Failed to load auth from storage", err);
    return null;
  }
};
