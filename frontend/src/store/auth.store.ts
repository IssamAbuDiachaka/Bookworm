// src/store/useAuthStore.ts
import { create } from "zustand";
import api from "../api/axios";
import toast from "react-hot-toast";
import type { User } from "../types";
import { type UserRole } from "../types";
import type { NavigateFunction } from "react-router-dom";

interface AuthState {
  user: User | null;
  token: string | null;

  isSigningUp: boolean;
  isVerifying: boolean;
  isLoggingIn: boolean;

  signup: (
    formData: Partial<User>,
    navigate: NavigateFunction
  ) => Promise<void>;
  login: (
    formData: { email: string; password: string },
    navigate: any
  ) => Promise<void>;
  verifyUser: (token: string, navigate: NavigateFunction) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

  isSigningUp: false,
  isVerifying: false,
  isLoggingIn: false,

  // Signup user
  signup: async (formData, navigate) => {
    set({ isSigningUp: true });
    try {
      const res = await api.post("/auth/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      const { user } = res.data as { user: User };
      set({ user }); // save only user
      toast.success(
        "Account created successfully! Please check your email to verify."
      );
      navigate("/verify-info");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Verify user
  verifyUser: async (token, navigate) => {
    set({ isVerifying: true });
    try {
      const res = await api.get(`/verify-email/${token}`);
      const { user, token: authToken } = res.data as {
        user: User;
        token: string;
      };

      set({ user, token: authToken }); // now store token & user
      toast.success(res.data.message || "Account verified successfully!");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Verification failed");
    } finally {
      set({ isVerifying: false });
    }
  },

  // Resend verification link to email
  resendVerification: async (email) => {
    try {
      await api.post("/resend-verification", { email });
      toast.success("Verification email resent. Please check your inbox.");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to resend verification"
      );
    }
  },

  // Login
  login: async (formData, navigate) => {
    set({ isLoggingIn: true });
    try {
      const res = await api.post("/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      const { token, user } = res.data as { token: string; user: User };

      // Check if user is verified before allowing login
      if (!user.isVerified) {
        toast.error(
          "Account not verified. Please verify your email before logging in."
        );
        navigate("/verify-info"); // to verify info page
        return;
      }

      // Save token + user if verified
      set({ token, user });
      toast.success("Welcome back!");
      navigate("/services");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
