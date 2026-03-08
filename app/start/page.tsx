"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lock, Rocket, ChevronDown, User, Sparkles, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import GB from "country-flag-icons/react/3x2/GB";
import VN from "country-flag-icons/react/3x2/VN";

type View = "splash" | "slide1" | "slide2";
type Lang = "vi" | "en";

function setOnboarded() {
  localStorage.setItem("outfy_onboarded", "true");
}

// ──────────────── Language Data ────────────────

const LANGS: { code: Lang; Flag: React.ComponentType<{ className?: string }>; label: string; short: string }[] = [
  { code: "en", Flag: GB, label: "English (EN)", short: "EN" },
  { code: "vi", Flag: VN, label: "Tiếng Việt (VI)", short: "VI" },
];

// ──────────────── Language Bottom Sheet ────────────────

function LangBottomSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="lang-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            key="lang-sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full z-50 rounded-t-3xl bg-white px-6 pb-10 pt-5 shadow-2xl"
            style={{ maxWidth: 430 }}
          >
            {/* Drag handle */}
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
                  onClick={() => { void i18n.changeLanguage(code); onClose(); }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3.5 transition-colors hover:bg-[#F8FAFC] active:bg-[#F1F5F9]"
                >
                  <Flag className="h-5 w-7 rounded-sm object-cover shadow-sm" />
                  <span className="flex-1 text-left text-base font-medium text-[#0f172a]">{label}</span>
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

// ──────────────── Icons ────────────────

function OutfyLogo() {
  return (
    <Image
      src="/images/Logo ko-01.png"
      alt="Outfy"
      width={180}
      height={180}
      priority
      className="object-contain drop-shadow-xl"
    />
  );
}

function PersonIcon() {
  return <User size={64} stroke="#94A3B8" strokeWidth={1.5} />;
}

function SparklesIcon() {
  return <Sparkles size={64} stroke="#94A3B8" strokeWidth={1.5} />;
}

// ──────────────── Pagination Dots ────────────────

function Dots({ active }: { active: 0 | 1 }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: active === i ? 20 : 8,
            height: 8,
            background: active === i ? "var(--primary)" : "#CBD5E1",
          }}
        />
      ))}
    </div>
  );
}

// ──────────────── Language Badge ────────────────

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

// ──────────────── Slide variants ────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const transition: import("framer-motion").Transition = { type: "tween", duration: 0.35, ease: "easeInOut" };

// ──────────────── Splash Screen ────────────────

function SplashScreen({
  onStart,
  onGuest,
  onLangOpen,
}: {
  onStart: () => void;
  onGuest: () => void;
  onLangOpen: () => void;
}) {
  const { t } = useTranslation();
  const router = useRouter();

  const handleGuest = () => {
    setOnboarded();
    router.replace("/home");
    onGuest();
  };

  const handleStart = () => {
    onStart();
  };

  return (
    <motion.div
      key="splash"
      custom={0}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      className="flex flex-col min-h-screen w-full items-center px-6 py-8 bg-white"
    >
      {/* Language badge */}
      <div className="w-full flex items-start pt-4">
        <LangBadge onClick={onLangOpen} />
      </div>

      {/* Logo */}
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <OutfyLogo />

        {/* Heading */}
        <div className="text-center space-y-1">
          <p className="text-[28px] font-bold leading-tight text-[#0f172a]">
            {t("splash.heading1")}
          </p>
          <p className="text-[28px] font-bold leading-tight">
            <span className="text-[#0f172a]">{t("splash.heading2")} </span>
            <span style={{ color: "var(--primary)" }}>{t("splash.heading2Accent")}</span>
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-center text-sm text-[#64748B] leading-relaxed max-w-xs">
          {t("splash.subtitle")}
        </p>
      </div>

      {/* CTAs */}
      <div className="w-full space-y-3 pb-6">
        <button
          onClick={handleStart}
          className="flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-semibold text-white transition-opacity active:opacity-80"
          style={{ background: "var(--primary)" }}
        >
          <ArrowRight size={18} />
          <span>{t("splash.startBtn")}</span>
        </button>

        <button
          onClick={handleGuest}
          className="w-full rounded-full border py-4 text-base font-semibold transition-opacity active:opacity-70"
          style={{ color: "var(--secondary)", borderColor: "var(--secondary)" }}
        >
          {t("splash.guestBtn")}
        </button>

        <p className="text-center text-xs text-[#94A3B8] mt-2 flex items-center justify-center gap-1">
          <Lock size={12} />
          {t("splash.securityNote")}
        </p>
      </div>
    </motion.div>
  );
}

// ──────────────── Onboarding Slide ────────────────

function OnboardingSlide({
  slideIndex,
  onSkip,
  onNext,
  onFinish,
  onLangOpen,
}: {
  slideIndex: 0 | 1;
  onSkip: () => void;
  onNext: () => void;
  onFinish: () => void;
  onLangOpen: () => void;
}) {
  const { t } = useTranslation();
  const isLastSlide = slideIndex === 1;
  const icons = [<PersonIcon key={0} />, <SparklesIcon key={1} />];

  return (
    <motion.div
      key={`slide-${slideIndex}`}
      custom={1}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      className="flex flex-col min-h-screen w-full bg-white px-6 py-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <LangBadge onClick={onLangOpen} />
        <button
          onClick={onSkip}
          className="text-sm font-semibold tracking-wide"
          style={{ color: "var(--primary)" }}
        >
          {t("onboarding.skip")}
        </button>
      </div>

      {/* Illustration card */}
      <div
        className="mt-6 flex items-center justify-center rounded-3xl"
        style={{ background: "#F1F5F9", height: 380 }}
      >
        {icons[slideIndex]}
      </div>

      {/* Content */}
      <div className="text-center flex flex-1 flex-col justify-center mt-8 space-y-4">
        <h2 className="text-[26px] font-bold leading-snug">
          {slideIndex === 0 ? (
            <>
              <span className="text-[#0f172a]">{t("onboarding.slide1.heading")} </span>
              <span style={{ color: "var(--secondary)" }}>{t("onboarding.slide1.headingAccent")}</span>
            </>
          ) : (
            <>
              <span className="text-[#0f172a]">{t("onboarding.slide2.heading1")} </span>
              <span style={{ color: "var(--secondary)" }}>{t("onboarding.slide2.headingAccent")}</span>
              {t("onboarding.slide2.heading2") && (
                <><br /><span className="text-[#0f172a]">{t("onboarding.slide2.heading2")}</span></>
              )}
            </>
          )}
        </h2>
        <p className="text-sm text-[#64748B] leading-relaxed">
          {slideIndex === 0 ? t("onboarding.slide1.description") : t("onboarding.slide2.description")}
        </p>
      </div>

      {/* Dots */}
      <div className="mb-6">
        <Dots active={slideIndex} />
      </div>

      {/* CTA */}
      <div className="pb-6 space-y-2">
        <button
          onClick={isLastSlide ? onFinish : onNext}
          className="flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-semibold text-white transition-opacity active:opacity-80"
          style={{ background: "var(--primary)" }}
        >
          {isLastSlide ? <Rocket size={18} /> : <ArrowRight size={18} />}
          <span>{isLastSlide ? t("onboarding.slide2.cta") : t("onboarding.slide1.cta")}</span>
        </button>

        {isLastSlide && (
          <p className="text-center text-xs text-[#94A3B8]">
            {t("onboarding.slide2.terms")}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ──────────────── Page ────────────────

export default function StartPage() {
  const router = useRouter();
  const [view, setView] = useState<View>("splash");
  const [langOpen, setLangOpen] = useState(false);

  const handleSkip = () => {
    setOnboarded();
    router.replace("/login");
  };

  const handleFinish = () => {
    setOnboarded();
    router.replace("/login");
  };

  return (
    <div className="relative overflow-hidden w-full" style={{ minHeight: "100dvh" }}>
      <AnimatePresence mode="wait" initial={false}>
        {view === "splash" && (
          <SplashScreen
            onStart={() => setView("slide1")}
            onGuest={() => { }}
            onLangOpen={() => setLangOpen(true)}
          />
        )}

        {view === "slide1" && (
          <OnboardingSlide
            slideIndex={0}
            onSkip={handleSkip}
            onNext={() => setView("slide2")}
            onFinish={handleFinish}
            onLangOpen={() => setLangOpen(true)}
          />
        )}

        {view === "slide2" && (
          <OnboardingSlide
            slideIndex={1}
            onSkip={handleSkip}
            onNext={() => { }}
            onFinish={handleFinish}
            onLangOpen={() => setLangOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Language picker — rendered outside AnimatePresence to float above all screens */}
      <LangBottomSheet open={langOpen} onClose={() => setLangOpen(false)} />
    </div>
  );
}
