import { create } from "zustand";
import API from "../lib/axios";

interface Booking {
  _id: string;
  date: string;
  status: string;
  service: any;
}

interface BookingStore {
  bookings: Booking[];
  bookService: (serviceId: string, date: string) => void;
  fetchBookings: () => Promise<void>;
  cancelBooking: (id: string) => void;
  createBooking: (serviceId: string, date: string) => Promise<void>;
}

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  bookService: async (serviceId, date) => {
    await API.post("/bookings", { serviceId, date });
  },
  createBooking: async (serviceId, date) => {
    const res = await API.post("/bookings", { serviceId, date });
    set((state) => ({
      bookings: [...state.bookings, res.data],
    }));
  },
  fetchBookings: async () => {
    const res = await API.get("/bookings");
    set({ bookings: res.data });
  },
  cancelBooking: async (id) => {
    await API.delete(`/bookings/${id}`);
    set((state) => ({
      bookings: state.bookings.filter((b) => b._id !== id),
    }));
  },
}));
