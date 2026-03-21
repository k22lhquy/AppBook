import { create } from "zustand";
import axiosInstance from "../lib/axios";

const useAuthStore = create((set) => ({
  // ─── State ───────────────────────────────────────────────
  user: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,

  // ─── Register ────────────────────────────────────────────
  register: async ({ username, email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, isLoading: false });

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Đăng ký thất bại";
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // ─── Login ───────────────────────────────────────────────
  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, isLoading: false });

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Đăng nhập thất bại";
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // ─── Logout ──────────────────────────────────────────────
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, error: null });
  },

  // ─── Clear error ─────────────────────────────────────────
  clearError: () => set({ error: null }),
}));

export default useAuthStore;