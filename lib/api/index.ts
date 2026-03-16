import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("outfy-auth");
    if (raw) {
      const { state } = JSON.parse(raw) as { state: { token: string | null } };
      if (state?.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    // Return unwrapped data for easier access
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("outfy-auth");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
