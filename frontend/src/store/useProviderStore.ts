import { create } from "zustand";
import API from "../lib/axios";

interface Provider {
  bio: string;
  location: string;
  categories: string[];
  portfolio: string[];
}

interface ProviderStore {
  profile: Provider | null;
  getProfile: () => Promise<void>;
  createProfile: (data: Provider) => Promise<void>;
  updateProfile: (data: Partial<Provider>) => Promise<void>;
  deleteProfile: () => Promise<void>;
}

export const useProviderStore = create<ProviderStore>((set) => ({
  profile: null,
  getProfile: async () => {
    const res = await API.get("/providers/me");
    set({ profile: res.data });
  },
  createProfile: async (data) => {
    await API.post("/providers", data);
  },
  updateProfile: async (data) => {
    const res = await API.put("/providers", data);
    set({ profile: res.data });
  },
  deleteProfile: async () => {
    await API.delete("/providers");
    set({ profile: null });
  },
}));
