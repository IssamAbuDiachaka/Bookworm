import { create } from 'zustand';
// import { User } from '../types';
import type { User } from '../types';

type AuthState = {
  user: User | null;
  token: string | null;
  setAuth: (payload: { user: User; token: string }) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: ({ user, token }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, token });
  },
  clearAuth: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  },
}));

export const loadAuthFromStorage = () => {
  const token = localStorage.getItem('token');
  const userRaw = localStorage.getItem('user');
  if (token && userRaw) {
    try {
      const user = JSON.parse(userRaw) as User;
      useAuthStore.getState().setAuth({ user, token });
    } catch {}
  }
};