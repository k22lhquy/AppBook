import { create } from "zustand";
import axiosInstance from "../lib/axios";

const useBookStore = create((set, get) => ({
  // ─── State ───────────────────────────────────────────────
  books: [],
  userBooks: [],
  isLoading: false,
  error: null,

  // Pagination
  currentPage: 1,
  totalPages: 1,
  totalBooks: 0,

  // ─── Lấy tất cả sách (có phân trang) ────────────────────
  getBooks: async (page = 1, limit = 2) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.get("/books", {
        params: { page, limit },
      });

      set({
        books: data.books,
        currentPage: Number(data.currentPage),
        totalPages: data.totalPages,
        totalBooks: data.totalBooks,
        isLoading: false,
      });
    } catch (error) {
      const message = error.response?.data?.message || "Không thể tải sách";
      set({ error: message, isLoading: false });
    }
  },

  // ─── Load thêm (infinite scroll / load more) ─────────────
  loadMoreBooks: async (limit = 2) => {
    const { currentPage, totalPages, books } = get();
    const nextPage = currentPage + 1;

    if (nextPage > totalPages) return; // Không còn trang nào

    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.get("/books", {
        params: { page: nextPage, limit },
      });

      set({
        books: [...books, ...data.books], // Gộp vào danh sách cũ
        currentPage: Number(data.currentPage),
        totalPages: data.totalPages,
        totalBooks: data.totalBooks,
        isLoading: false,
      });
    } catch (error) {
      const message = error.response?.data?.message || "Không thể tải thêm sách";
      set({ error: message, isLoading: false });
    }
  },

  // ─── Lấy sách của user hiện tại ──────────────────────────
  getUserBooks: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.get("/books/user");
      set({ userBooks: data, isLoading: false });
    } catch (error) {
      const message = error.response?.data?.message || "Không thể tải sách của bạn";
      set({ error: message, isLoading: false });
    }
  },

  // ─── Tạo sách mới ────────────────────────────────────────
  createBook: async ({ title, caption, rating, image }) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.post("/books", {
        title,
        caption,
        rating,
        image, // base64 string
      });

      // Thêm vào đầu danh sách
      set((state) => ({
        books: [data, ...state.books],
        userBooks: [data, ...state.userBooks],
        totalBooks: state.totalBooks + 1,
        isLoading: false,
      }));

      return { success: true, book: data };
    } catch (error) {
      const message = error.response?.data?.message || "Không thể tạo sách";
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // ─── Xoá sách ────────────────────────────────────────────
  deleteBook: async (bookId) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/books/${bookId}`);

      set((state) => ({
        books: state.books.filter((b) => b._id !== bookId),
        userBooks: state.userBooks.filter((b) => b._id !== bookId),
        totalBooks: state.totalBooks - 1,
        isLoading: false,
      }));

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Không thể xoá sách";
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // ─── Clear error ─────────────────────────────────────────
  clearError: () => set({ error: null }),
}));

export default useBookStore;