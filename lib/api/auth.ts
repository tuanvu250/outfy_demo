import api from "./index";
import type {
  RegisterRequest,
  VerifyEmailRequest,
  ResendVerificationRequest,
  LoginRequest,
  RefreshTokenRequest,
  AuthResponse,
  User,
  ApiResponse,
} from "@/lib/types/auth";

// Backend response wrapper type - unwrapped by interceptor
type ApiAuthResponse<T> = ApiResponse<T>;

export const authApi = {
  // ============================================
  // Register - creates new user account
  // Does NOT return tokens, user must verify email first
  // ============================================
  register: (data: RegisterRequest) =>
    api
      .post<ApiAuthResponse<User>>("/auth/register", data)
      .then((res) => res as unknown as ApiAuthResponse<User>),

  // ============================================
  // Verify Email - verify OTP sent to email
  // ============================================
  verifyEmail: (data: VerifyEmailRequest) =>
    api
      .post<ApiAuthResponse<null>>("/auth/verify-email", data)
      .then((res) => res as unknown as ApiAuthResponse<null>),

  // ============================================
  // Resend Verification Email - request new OTP
  // ============================================
  resendVerification: (data: ResendVerificationRequest) =>
    api
      .post<ApiAuthResponse<null>>("/auth/resend-verification-email", data)
      .then((res) => res as unknown as ApiAuthResponse<null>),

  // ============================================
  // Login - authenticate user
  // Returns accessToken + refreshToken on success
  // ============================================
  login: (data: LoginRequest) =>
    api
      .post<ApiAuthResponse<AuthResponse>>("/auth/login", data)
      .then((res) => res as unknown as ApiAuthResponse<AuthResponse>),

  // ============================================
  // Refresh Token - get new access token
  // ============================================
  refreshToken: (data: RefreshTokenRequest) =>
    api
      .post<ApiAuthResponse<AuthResponse>>("/auth/refresh", data)
      .then((res) => res as unknown as ApiAuthResponse<AuthResponse>),

  // ============================================
  // Logout - invalidate tokens
  // ============================================
  logout: () =>
    api
      .post<ApiAuthResponse<null>>("/auth/logout")
      .then((res) => res as unknown as ApiAuthResponse<null>),

  // ============================================
  // Get Current User - requires auth token
  // ============================================
  getCurrentUser: () =>
    api
      .get<ApiAuthResponse<User>>("/auth/me")
      .then((res) => res as unknown as ApiAuthResponse<User>),

  // ============================================
  // Legacy functions (for backward compatibility)
  // ============================================

  sendOtp: (email: string) =>
    api
      .post<ApiAuthResponse<null>>("/auth/resend-verification-email", {
        email,
      })
      .then((res) => res as unknown as ApiAuthResponse<null>),

  verifyOtp: (data: VerifyEmailRequest) =>
    api
      .post<ApiAuthResponse<null>>("/auth/verify-email", data)
      .then((res) => res as unknown as ApiAuthResponse<null>),

  forgotPassword: (email: string) =>
    api
      .post<ApiAuthResponse<null>>("/auth/forgot-password", { email })
      .then((res) => res as unknown as ApiAuthResponse<null>),
};
