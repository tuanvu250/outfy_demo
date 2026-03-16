"use client";

import { Suspense, useRef, useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  AlertCircle,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { otpSchema, OtpFormData } from "@/lib/utils/validators";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/authStore";

// Store key for pending email verification
const PENDING_EMAIL_KEY = "outfy_pending_email";

function OtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");
  const { t } = useTranslation();

  // Try to get email from param or localStorage
  const [email, setEmail] = useState(emailParam || "");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const canResend = countdown <= 0;
  const setAuth = useAuthStore((state) => state.setAuth);

  // Get email from localStorage if not in param
  useEffect(() => {
    if (!email && !emailParam) {
      const storedEmail = localStorage.getItem(PENDING_EMAIL_KEY);
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
  }, [email, emailParam]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = async () => {
    if (!email) {
      setError(t("auth.invalidEmail"));
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.resendVerification({ email });
      if (response.success) {
        setCountdown(300); // Reset to 5 minutes
      } else {
        setError(response.message || t("otp.resendError"));
      }
    } catch (err) {
      console.error("Resend error:", err);
      setError(t("otp.resendError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!email) {
      setError(t("auth.invalidEmail"));
      return;
    }
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError(t("otp.otpRequired"));
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.verifyEmail({ email, otp: otpValue });
      if (response.success) {
        setIsVerified(true);
        // Auto-login after verification
        setTimeout(async () => {
          try {
            const loginResponse = await authApi.login({ email, password: "" });
            if (loginResponse.success) {
              setAuth(loginResponse.data);
              router.push("/home");
            } else {
              // If auto-login fails, redirect to login
              router.push("/login");
            }
          } catch {
            router.push("/login");
          }
        }, 1500);
      } else {
        setError(response.message || t("otp.invalidOtp"));
      }
    } catch (err) {
      console.error("Verify error:", err);
      setError(t("otp.invalidOtp"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = useCallback(
    (index: number, value: string) => {
      const digit = value.replace(/\D/, "").slice(-1);
      const next = [...otp];
      next[index] = digit;
      setOtp(next);
      if (digit && index < 5) inputs.current[index + 1]?.focus();
    },
    [otp],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    },
    [otp],
  );

  const isComplete = otp.every((d) => d !== "");

  // Format countdown
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const timerDisplay = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Mask email for display
  const displayEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, "$1***$3")
    : "email của bạn";

  if (isVerified) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
        <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
        <h1 className="text-2xl font-extrabold text-[#0f172a] mb-2">
          {t("otp.verifySuccess")}
        </h1>
        <p className="text-sm text-[var(--primary)]">{t("otp.redirecting")}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white px-6">
      {/* Header */}
      <div className="relative flex items-center justify-center pt-12 pb-4">
        <button
          onClick={() => router.back()}
          className="absolute left-0 p-2 active:opacity-60"
        >
          <ArrowLeft size={20} stroke="#0f172a" />
        </button>
        <span className="text-xs font-bold tracking-[2.5px] text-[var(--primary)] uppercase">
          {t("otp.title")}
        </span>
      </div>

      {/* Avatar circle */}
      <div className="flex justify-center mt-8 mb-8">
        <div className="h-24 w-24 rounded-full bg-[var(--secondary)] flex items-center justify-center">
          <span className="text-3xl font-bold text-white">✉️</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-extrabold text-[#0f172a] mb-3">
          {t("otp.title")}
        </h1>
        <p className="text-sm text-[var(--primary)]">{t("otp.enterCode")}</p>
        <p className="text-sm font-semibold text-[var(--primary)] mt-0.5">
          {displayEmail}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm mx-6">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* OTP inputs */}
      <div className="flex justify-center gap-3 mb-8 px-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="h-14 w-12 rounded-2xl border-2 border-[#e2e8f0] bg-[#f8fafc] text-center text-xl font-bold text-[#0f172a] outline-none transition-all focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        ))}
      </div>

      {/* Timer & resend */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 rounded-full bg-[#f1f5f9] px-4 py-2">
          <Clock size={14} stroke="#475569" />
          <span className="text-sm font-semibold text-[#475569]">
            {timerDisplay}
          </span>
        </div>
        <p className="text-sm text-[#475569]">
          {t("otp.resendPrompt")}{" "}
          <button
            type="button"
            onClick={canResend && !isLoading ? handleResend : undefined}
            disabled={!canResend || isLoading}
            className={`font-bold ${canResend ? "text-[var(--primary)] active:opacity-60" : "text-[var(--primary)] opacity-50 cursor-default"}`}
          >
            {isLoading ? t("auth.processing") : t("otp.resend")}
          </button>
        </p>
      </div>

      {/* Confirm button */}
      <div className="mt-auto pb-10 pt-6 px-6">
        <button
          type="button"
          onClick={handleVerify}
          disabled={!isComplete || isLoading}
          className="h-14 w-full rounded-full bg-[var(--primary)] text-base font-bold text-white transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-40 flex items-center justify-center gap-2"
          style={{
            boxShadow:
              "0 4px 6px color-mix(in srgb, var(--primary) 25%, transparent)",
          }}
        >
          {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
          {t("otp.confirm") || "Xác Nhận & Tiếp Tục"}
        </button>
      </div>
    </div>
  );
}

export default function OtpPage() {
  return (
    <Suspense>
      <OtpContent />
    </Suspense>
  );
}
