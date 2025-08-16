// src/store/useAuthStore.ts
import { create } from "zustand";
import api from "../api/axios";
import toast from "react-hot-toast";
import type { User } from "../types";
import { type UserRole } from "../types";

interface AuthState {
  token: string | null;
  user: User | null;
  isSigningUp: boolean;
  isVerifying: boolean;
  signup: (data: SignupData, navigate: (path: string) => void) => Promise<void>;
  verifyUser: (token: string, navigate: (path: string) => void) => Promise<void>;
  setAuth: (payload: { token: string; user: User }) => void;
  resendVerification: (email: string) => Promise<void>;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  role?: UserRole;
  avatar?: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isSigningUp: false,
  isVerifying: false,

  setAuth: ({ token, user }) => set({ token, user }),

  signup: async (formData, navigate) => {
    set({ isSigningUp: true });
    try {
      const res = await api.post("http://localhost:5000/api/auth/register", formData, {
        headers: { "Content-Type": "application/json" },
      });
      const { token, user } = res.data as { token: string; user: User };
      set({ token, user });
      toast.success("Account created successfully! Please check your email to verify.");
      navigate("/verify-info");      
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  verifyUser: async (token, navigate) => {
    set({ isVerifying: true });
    try {
      const res = await api.get(`/verify-email/${token}`);
      toast.success(res.data.message || "Account verified successfully!");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Verification failed");
    } finally {
      set({ isVerifying: false });
    }
  },

  resendVerification: async (email: string) => {
    try {
      const res = await api.post("http://localhost:5000/api/auth/resend-verification", { email });
      toast.success(res.data.message || "Verification email sent again!");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to resend verification");
    }
  },
  

}));
