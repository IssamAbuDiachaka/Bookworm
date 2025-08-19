import { create } from "zustand";
import API from "../lib/axios";

interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
}

interface ServiceState {
  services: Service[];
  fetchServices: () => Promise<void>;
  updateService: (id: string, data: Partial<Service>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
}

export const useServiceStore = create<ServiceState>((set) => ({
  services: [],
  fetchServices: async () => {
    const res = await API.get("/services");
    set({ services: res.data });
  },
  updateService: async (id, data) => {
    const res = await API.put(`/services/${id}`, data);
    set((state) => ({
      services: state.services.map((s) => (s._id === id ? res.data : s)),
    }));
  },
  deleteService: async (id) => {
    await API.delete(`/services/${id}`);
    set((state) => ({
      services: state.services.filter((s) => s._id !== id),
    }));
  },
}));
