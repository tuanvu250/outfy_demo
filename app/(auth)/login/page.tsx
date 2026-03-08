"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import GB from "country-flag-icons/react/3x2/GB";
import VN from "country-flag-icons/react/3x2/VN";
import { loginSchema, registerSchema, LoginFormData, RegisterFormData } from "@/lib/utils/validators";

type Lang = "vi" | "en";

const LANGS: { code: Lang; Flag: React.ComponentType<{ className?: string }>; label: string; short: string }[] = [
  { code: "en", Flag: GB, label: "English (EN)", short: "EN" },
  { code: "vi", Flag: VN, label: "Tiếng Việt (VI)", short: "VI" },
];

function LangBottomSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
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
            <h3 className="mb-5 text-lg font-bold" style={{ color: "var(--primary)" }}>
              {t("lang.choosePicker")}
            </h3>
            <div className="space-y-1">
              {LANGS.map(({ code, Flag, label }) => (
                <button
                  key={code}
                  onClick={() => { void i18n.changeLanguage(code); onClose(); }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3.5 transition-colors hover:bg-[#F8FAFC] active:bg-[#F1F5F9]"
                >
                  <Flag className="h-5 w-7 rounded-sm object-cover shadow-sm" />
                  <span className="flex-1 text-left text-base font-medium text-[#0f172a]">{label}</span>
                  {lang === code && <Check size={20} stroke="var(--primary)" strokeWidth={2} />}
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
  const { t } = useTranslation();
  const router = useRouter();

  const loginForm = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const onLoginSubmit = async (data: LoginFormData) => {
    console.log("Login:", data);
    router.push("/home");
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    console.log("Register:", data);
    router.push("/otp");
  };

  const isSubmitting =
    mode === "login" ? loginForm.formState.isSubmitting : registerForm.formState.isSubmitting;

  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-8 pb-8 overflow-y-auto">
      {/* Top bar: language toggle */}
      <div className="w-full flex items-center justify-between pt-5 pb-2">
        <LangBadge onClick={() => setLangOpen(true)} />
      </div>

      {/* <div className="text-primary text-3xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
        OUTFY
      </div> */}

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

      {/* Form fields */}
      <div className="w-full space-y-3">
        <input
          {...(mode === "login" ? loginForm.register("email") : registerForm.register("email"))}
          type="email"
          placeholder="Email"
          className="h-14 w-full rounded-2xl border border-[var(--border-light)] bg-white px-4 text-sm outline-none transition-all placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
        />
        <input
          {...(mode === "login" ? loginForm.register("password") : registerForm.register("password"))}
          type="password"
          placeholder={t("auth.password")}
          className="h-14 w-full rounded-2xl border border-[var(--border-light)] bg-white px-4 text-sm outline-none transition-all placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
        />
        <AnimatePresence>
          {mode === "signup" && (
            <motion.div
              key="confirm-password"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "56px" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <input
                {...registerForm.register("confirmPassword")}
                type="password"
                placeholder={t("auth.confirmPassword")}
                className="h-14 w-full rounded-2xl border border-[var(--border-light)] bg-white px-4 text-sm outline-none transition-all placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Validation errors */}
        {mode === "login" && loginForm.formState.errors.email && (
          <p className="text-xs text-red-500">{loginForm.formState.errors.email.message}</p>
        )}
        {mode === "login" && loginForm.formState.errors.password && (
          <p className="text-xs text-red-500">{loginForm.formState.errors.password.message}</p>
        )}
        {mode === "signup" && registerForm.formState.errors.email && (
          <p className="text-xs text-red-500">{registerForm.formState.errors.email.message}</p>
        )}
        {mode === "signup" && registerForm.formState.errors.password && (
          <p className="text-xs text-red-500">{registerForm.formState.errors.password.message}</p>
        )}
        {mode === "signup" && registerForm.formState.errors.confirmPassword && (
          <p className="text-xs text-red-500">{registerForm.formState.errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Main button */}
      <button
        onClick={
          mode === "login"
            ? loginForm.handleSubmit(onLoginSubmit)
            : registerForm.handleSubmit(onRegisterSubmit)
        }
        disabled={isSubmitting}
        className="mt-8 h-14 w-full rounded-full bg-[var(--primary)] text-lg font-bold text-white transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-50"
        style={{ boxShadow: "0 4px 6px color-mix(in srgb, var(--primary) 25%, transparent)" }}
      >
        {isSubmitting ? t("auth.processing") : mode === "login" ? t("auth.login") : t("auth.register")}
      </button>

      {/* OR divider */}
      <div className="mt-6 flex w-full items-center gap-4">
        <div className="h-px flex-1 bg-[var(--border-light)]" />
        <span className="text-xs font-bold tracking-[2.4px] text-[#94A3B8]">OR</span>
        <div className="h-px flex-1 bg-[var(--border-light)]" />
      </div>

      {/* Google sign-in */}
      <button className="mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-full border border-[var(--border-light)] bg-white text-base font-semibold text-[#334155] transition-colors hover:bg-gray-50">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        {t("auth.continueWithGoogle")}
      </button>

      {/* Footer terms */}
      <p className="mt-8 px-4 text-center text-sm leading-relaxed text-[#94A3B8]">
        {t("auth.termsNotice")}{" "}
        <span className="cursor-pointer text-[var(--primary)] underline">{t("auth.termsOfService")}</span>{" "}
        {t("auth.and")}{" "}
        <span className="cursor-pointer text-[var(--primary)] underline">{t("auth.privacyPolicy")}</span>{" "}
        {t("auth.of")}
      </p>
    </div>
  );
}

