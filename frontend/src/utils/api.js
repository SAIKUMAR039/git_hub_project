import axios from "axios";

// Use environment variables to set API URL based on environment
const API_URL =
  import.meta.env.VITE_API_URL || "https://git-hub-project.onrender.com/api";

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to attach token for authenticated requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API calls
export const authAPI = {
  signup: (userData) => api.post("/auth/signup", userData),
  login: (userData) => api.post("/auth/login", userData),
};

// Search API calls
export const searchAPI = {
  searchRepos: (query) => api.get(`/search?query=${query}`),
};

// Bookmarks API calls
export const bookmarkAPI = {
  getBookmarks: () => api.get("/bookmarks"),
  addBookmark: (repo) => api.post("/bookmarks", repo),
  deleteBookmark: (repoId) => api.delete(`/bookmarks/${repoId}`),
};

export default api;
