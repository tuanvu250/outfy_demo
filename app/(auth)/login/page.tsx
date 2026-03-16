"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, AlertCircle, Loader2 } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import GB from "country-flag-icons/react/3x2/GB";
import VN from "country-flag-icons/react/3x2/VN";
import {
  loginSchema,
  registerSchema,
  LoginFormData,
  RegisterFormData,
} from "@/lib/utils/validators";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/authStore";

type Lang = "vi" | "en";

const LANGS: {
  code: Lang;
  Flag: React.ComponentType<{ className?: string }>;
  label: string;
  short: string;
}[] = [
  { code: "en", Flag: GB, label: "English (EN)", short: "EN" },
  { code: "vi", Flag: VN, label: "Tiếng Việt (VI)", short: "VI" },
];

// Store key for pending email verification
const PENDING_EMAIL_KEY = "outfy_pending_email";

function LangBottomSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="lang-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
          />
          <motion.div
            key="lang-sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full z-50 rounded-t-3xl bg-white px-6 pb-10 pt-5 shadow-2xl"
            style={{ maxWidth: 430 }}
          >
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[#E2E8F0]" />
            <h3
              className="mb-5 text-lg font-bold"
              style={{ color: "var(--primary)" }}
            >
              {t("lang.choosePicker")}
            </h3>
            <div className="space-y-1">
              {LANGS.map(({ code, Flag, label }) => (
                <button
                  key={code}
                  onClick={() => {
                    void i18n.changeLanguage(code);
                    onClose();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3.5 transition-colors hover:bg-[#F8FAFC] active:bg-[#F1F5F9]"
                >
                  <Flag className="h-5 w-7 rounded-sm object-cover shadow-sm" />
                  <span className="flex-1 text-left text-base font-medium text-[#0f172a]">
                    {label}
                  </span>
                  {lang === code && (
                    <Check size={20} stroke="var(--primary)" strokeWidth={2} />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function LangBadge({ onClick }: { onClick: () => void }) {
  const { i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[1];
  const { Flag } = current;
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-sm font-semibold text-[#0f172a] shadow-sm transition-opacity active:opacity-70"
    >
      <Flag className="h-4 w-5 rounded-sm object-cover" />
      <span>{current.short}</span>
      <ChevronDown size={12} stroke="#64748B" strokeWidth={1.5} />
    </button>
  );
}

type Mode = "login" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [langOpen, setLangOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.login(data);
      if (response.success) {
        // Store auth data
        setAuth(response.data);
        router.push("/home");
      } else {
        setError(response.message || t("auth.loginError"));
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(t("auth.loginError"));
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Prepare register data (exclude confirmPassword)
      const registerData = {
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        phone: data.phone,
        gender: data.gender,
      };
      const response = await authApi.register(registerData);
      if (response.success) {
        // Store pending email for OTP verification
        localStorage.setItem(PENDING_EMAIL_KEY, data.email);
        router.push(`/otp?email=${encodeURIComponent(data.email)}`);
      } else {
        setError(response.message || t("auth.registerError"));
      }
    } catch (err) {
      console.error("Register error:", err);
      setError(t("auth.registerError"));
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // Google OAuth2 Login Handler
  // ============================================
  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    if (!credentialResponse.credential) {
      setError(t("auth.loginError"));
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.googleLogin({
        idToken: credentialResponse.credential,
      });

      if (response.success) {
        // Store auth data
        setAuth(response.data);
        router.push("/home");
      } else {
        setError(response.message || t("auth.loginError"));
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError(t("auth.loginError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.log("Google Login Failed");
    setError(t("auth.googleLoginFailed") || t("auth.loginError"));
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-8 pb-8 overflow-y-auto">
      {/* Top bar: language toggle */}
      <div className="w-full flex items-center justify-between pt-5 pb-2">
        <LangBadge onClick={() => setLangOpen(true)} />
      </div>

      {/* Logo replace banner image */}
      <div className="mb-6 w-full flex justify-center py-6">
        <Image
          src="/images/Logo-black-mini2.png"
          alt="Outfy Logo"
          width={200}
          height={200}
          className="object-contain"
          priority
        />
      </div>

      {/* Language bottom sheet */}
      <LangBottomSheet open={langOpen} onClose={() => setLangOpen(false)} />

      {/* Toggle pill */}
      <div
        className="relative mb-6 h-12 w-full rounded-full"
        style={{ background: "rgba(226,232,240,0.5)" }}
      >
        {/* Animated slider */}
        <div
          className="pointer-events-none absolute top-[5px] bottom-[5px] rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            width: "calc(50% - 8px)",
            left: mode === "signup" ? "4px" : "calc(50% + 4px)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}
        />
        {/* Buttons */}
        <div className="relative flex h-full">
          <button
            className="flex flex-1 items-center justify-center text-sm font-semibold transition-colors duration-300"
            style={{ color: mode === "signup" ? "var(--primary)" : "#64748B" }}
            onClick={() => setMode("signup")}
          >
            {t("auth.register")}
          </button>
          <button
            className="flex flex-1 items-center justify-center text-sm font-semibold transition-colors duration-300"
            style={{ color: mode === "login" ? "var(--primary)" : "#64748B" }}
            onClick={() => setMode("login")}
          >
            {t("auth.login")}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 w-full p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Form fields */}
      <div className="w-full space-y-3">
        {/* Full Name - only for signup */}
        <AnimatePresence>
          {mode === "signup" && (
            <motion.div
              key="fullName"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <input
                {...registerForm.register("fullName")}
                type="text"
                placeholder={t("auth.fullName")}
                className="h-14 w-full rounded-2xl border border-[var(--border-light)] bg-white px-4 text-sm outline-none transition-all placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              />
              {registerForm.formState.errors.fullName && (
                <p className="text-xs text-red-500 mt-1">
                  {registerForm.formState.errors.fullName.message}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <input
          {...(mode === "login"
            ? loginForm.register("email")
            : registerForm.register("email"))}
          type="email"
          placeholder="Email"
          className="h-14 w-full rounded-2xl border border-[var(--border-light)] bg-white px-4 text-sm outline-none transition-all placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
        />
        <input
          {...(mode === "login"
            ? loginForm.register("password")
            : registerForm.register("password"))}
          type="password"
          placeholder={t("auth.password")}
          className="h-14 w-full rounded-2xl border border-[var(--border-light)] bg-white px-4 text-sm outline-none transition-all placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
        />

        {/* Confirm Password - only for signup */}
        <AnimatePresence>
          {mode === "signup" && (
            <motion.div
              key="confirm-password"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <input
                {...registerForm.register("confirmPassword")}
                type="password"
                placeholder={t("auth.confirmPassword")}
                className="h-14 w-full rounded-2xl border border-[var(--border-light)] bg-white px-4 text-sm outline-none transition-all placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              />
              {registerForm.formState.errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {registerForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Validation errors */}
        {mode === "login" && loginForm.formState.errors.email && (
          <p className="text-xs text-red-500">
            {loginForm.formState.errors.email.message}
          </p>
        )}
        {mode === "login" && loginForm.formState.errors.password && (
          <p className="text-xs text-red-500">
            {loginForm.formState.errors.password.message}
          </p>
        )}
        {mode === "signup" && registerForm.formState.errors.email && (
          <p className="text-xs text-red-500">
            {registerForm.formState.errors.email.message}
          </p>
        )}
        {mode === "signup" && registerForm.formState.errors.password && (
          <p className="text-xs text-red-500">
            {registerForm.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* Main button */}
      <button
        onClick={
          mode === "login"
            ? loginForm.handleSubmit(onLoginSubmit)
            : registerForm.handleSubmit(onRegisterSubmit)
        }
        disabled={isLoading}
        className="mt-8 h-14 w-full rounded-full bg-[var(--primary)] text-lg font-bold text-white transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-50 flex items-center justify-center gap-2"
        style={{
          boxShadow:
            "0 4px 6px color-mix(in srgb, var(--primary) 25%, transparent)",
        }}
      >
        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
        {isLoading
          ? t("auth.processing")
          : mode === "login"
            ? t("auth.login")
            : t("auth.register")}
      </button>

      {/* OR divider */}
      <div className="mt-6 flex w-full items-center gap-4">
        <div className="h-px flex-1 bg-[var(--border-light)]" />
        <span className="text-xs font-bold tracking-[2.4px] text-[#94A3B8]">
          OR
        </span>
        <div className="h-px flex-1 bg-[var(--border-light)]" />
      </div>

      {/* Google sign-in */}
      <div className="mt-6 w-full flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap={false}
          theme="outline"
          size="large"
          text="signin_with"
          shape="rectangular"
          width={320}
        />
      </div>

      {/* Footer terms */}
      <p className="mt-8 px-4 text-center text-sm leading-relaxed text-[#94A3B8]">
        {t("auth.termsNotice")}{" "}
        <span className="cursor-pointer text-[var(--primary)] underline">
          {t("auth.termsOfService")}
        </span>{" "}
        {t("auth.and")}{" "}
        <span className="cursor-pointer text-[var(--primary)] underline">
          {t("auth.privacyPolicy")}
        </span>{" "}
        {t("auth.of")}
      </p>
    </div>
  );
}
