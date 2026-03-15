import { z } from "zod";

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
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export const otpSchema = z.object({
  otp: z.string().length(6, "OTP phải có đúng 6 chữ số"),
});

export const measurementsSchema = z.object({
  height: z.number().min(100).max(250),
  weight: z.number().min(30).max(300),
  chest: z.number().min(50).max(200),
  waist: z.number().min(40).max(200),
  hips: z.number().min(50).max(200),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type MeasurementsFormData = z.infer<typeof measurementsSchema>;

// ============================================
// NEW: Generate Avatar Validation Schema
// ============================================

export const generateAvatarSchema = z.object({
  gender: z.enum(["male", "female"]),
  heightCm: z.number().min(100).max(250),
  weightKg: z.number().min(30).max(300),
  chestCm: z.number().min(50).max(200),
  waistCm: z.number().min(40).max(200),
  hipCm: z.number().min(50).max(200),
  shoulderCm: z.number().min(25).max(80),
  inseamCm: z.number().min(40).max(120),
});

export type GenerateAvatarFormData = z.infer<typeof generateAvatarSchema>;
