import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.4:3000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request: gắn token ───────────────────────────────
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log("Get token error:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response: xử lý 401 ─────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("token");

      // ❗ React Native không có window.location
      // 👉 bạn nên xử lý redirect ở component (router)
      console.log("Unauthorized - cần redirect login");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;