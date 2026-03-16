import { z } from "zod";

// ============================================
// Auth Validation Schemas
// ============================================

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email không được để trống")
      .email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    fullName: z.string().min(1, "Họ tên không được để trống"),
    phone: z.string().optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export const otpSchema = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
  otp: z.string().length(6, "OTP phải có đúng 6 chữ số"),
});

export const resendOtpSchema = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
});

// ============================================
// Other Validation Schemas
// ============================================

export const measurementsSchema = z.object({
  height: z.number().min(100).max(250),
  weight: z.number().min(30).max(300),
  chest: z.number().min(50).max(200),
  waist: z.number().min(40).max(200),
  hips: z.number().min(50).max(200),
});

// ============================================
// Generate Avatar Validation Schema
// ============================================

export const generateAvatarSchema = z.object({
  gender: z.enum(["MALE", "FEMALE"]),
  heightCm: z.number().min(100).max(250),
  weightKg: z.number().min(30).max(200),
  chestCm: z.number().min(50).max(200),
  waistCm: z.number().min(40).max(200),
  hipCm: z.number().min(50).max(200),
  shoulderCm: z.number().min(25).max(80),
  inseamCm: z.number().min(40).max(120),
});

// ============================================
// Type Inference
// ============================================

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type ResendOtpFormData = z.infer<typeof resendOtpSchema>;
export type MeasurementsFormData = z.infer<typeof measurementsSchema>;
export type GenerateAvatarFormData = z.infer<typeof generateAvatarSchema>;
