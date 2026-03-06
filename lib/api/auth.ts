import api from "./index";
import type { LoginCredentials, RegisterData, OtpVerifyData, AuthResponse } from "@/lib/types/auth";

export const authApi = {
  login: (data: LoginCredentials) =>
    api.post<AuthResponse>("/auth/login", data),

  register: (data: RegisterData) =>
    api.post<{ message: string }>("/auth/register", data),

  sendOtp: (email: string) =>
    api.post<{ message: string }>("/auth/otp/send", { email }),

  verifyOtp: (data: OtpVerifyData) =>
    api.post<AuthResponse>("/auth/otp/verify", data),

  forgotPassword: (email: string) =>
    api.post<{ message: string }>("/auth/forgot-password", { email }),

  logout: () => api.post("/auth/logout"),
};
