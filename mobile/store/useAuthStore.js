import { create } from "zustand";
import axiosInstance from "./lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create((set) => ({
  // ─── State ───────────────────────────────────────────────
  user: null,
  token: null,
  isLoading: false,
  error: null,

  // ─── Load token khi app mở ───────────────────────────────
  loadToken: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        set({ token });
      }
    } catch (e) {
      console.log("Load token error:", e);
    }
  },

  // ─── Register ────────────────────────────────────────────
  register: async ({ username, email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });

      await AsyncStorage.setItem("token", data.token);

      set({
        user: data.user,
        token: data.token,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Đăng ký thất bại";
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

      await AsyncStorage.setItem("token", data.token);

      set({
        user: data.user,
        token: data.token,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Đăng nhập thất bại";
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // ─── Logout ──────────────────────────────────────────────
  logout: async () => {
    await AsyncStorage.removeItem("token");
    set({ user: null, token: null, error: null });
  },

  // ─── Clear error ─────────────────────────────────────────
  clearError: () => set({ error: null }),
}));

export default useAuthStore;