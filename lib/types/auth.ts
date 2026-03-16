// ============================================
// Auth & Authentication Types
// ============================================

// User gender enum
export type Gender = "MALE" | "FEMALE" | "OTHER";

// User entity
export interface User {
  id: number;
  email: string;
  fullName: string;
  phone?: string;
  gender?: Gender;
  role: "USER" | "ADMIN";
  isEmailVerified: boolean;
  emailVerifiedAt?: string;
  createdAt: string;
}

// Auth Response with tokens
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

// ============================================
// Request DTOs
// ============================================

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  gender?: Gender;
}

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// ============================================
// API Response wrapper
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string>;
}

// ============================================
// Legacy types (for backward compatibility)
// ============================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface OtpVerifyData {
  email: string;
  otp: string;
}
