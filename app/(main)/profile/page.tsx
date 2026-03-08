"use client";

import { useState, useRef } from "react";
import { User, Camera, MessageCircle, ChevronDown, Check, Sparkles, Globe, ScanFace } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import GB from "country-flag-icons/react/3x2/GB";
import VN from "country-flag-icons/react/3x2/VN";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
            className="fixed inset-0 z-[60] bg-black/40"
            onClick={onClose}
          />
          <motion.div
            key="lang-sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full z-[70] rounded-t-3xl bg-white px-6 pb-10 pt-5 shadow-2xl"
            style={{ maxWidth: 430 }}
          >
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[#E2E8F0]" />
            <h3 className="mb-5 text-lg font-bold text-[var(--primary)]">
              {t("lang.choosePicker", "Chọn ngôn ngữ")}
            </h3>
            <div className="space-y-1">
              {LANGS.map(({ code, Flag, label }) => (
                <button
                  key={code}
                  onClick={() => { void i18n.changeLanguage(code); onClose(); }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3.5 transition-colors hover:bg-slate-50 active:bg-slate-100"
                >
                  <Flag className="h-5 w-7 rounded-sm object-cover shadow-sm" />
                  <span className="flex-1 text-left text-base font-medium text-[var(--text-primary)]">{label}</span>
                  {lang === code && <Check size={20} className="text-[var(--primary)]" strokeWidth={2} />}
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
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-light)] bg-white px-3 py-1.5 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-opacity active:opacity-70 z-10 relative"
    >
      <Flag className="h-4 w-5 rounded-sm object-cover" />
      <span>{current.short}</span>
      <ChevronDown size={12} className="text-[var(--text-tertiary)]" strokeWidth={1.5} />
    </button>
  );
}

// Custom Switch Toggle Component
function Switch({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2",
        checked ? "bg-[var(--primary)]" : "bg-slate-200"
      )}
      onClick={() => onChange(!checked)}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          checked ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

export default function ProfilePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [langOpen, setLangOpen] = useState(false);
  const [avatarImg, setAvatarImg] = useState<string | null>(null);
  const [metric, setMetric] = useState(true);
  const [aiAlerts, setAiAlerts] = useState(true);
  const [publicWardrobe, setPublicWardrobe] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const STATS = [
    { label: t("profile.stats.items", "Items"), value: "89" },
    { label: t("profile.stats.outfits", "outfits"), value: "36" },
    { label: t("profile.stats.friends", "friends"), value: "20" },
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setAvatarImg(imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 relative overflow-x-hidden">
      {/* Background decoration to match Figma (white top area) */}
      <div className="absolute top-0 left-0 right-0 h-[220px] bg-white rounded-b-[40px] z-0" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-8 pb-4">
        <LangBadge onClick={() => setLangOpen(true)} />
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-white bg-[var(--primary)] transition-transform active:scale-95"
        >
          <MessageCircle size={20} className="fill-white" />
        </button>
      </div>

      {/* Avatar Section */}
      <div className="relative z-10 mt-2 flex flex-col items-center px-5">
        <div className="relative">
          {/* Avatar circle with glow */}
          <div
            className="flex items-center justify-center rounded-full p-1 bg-[var(--primary)] relative"
            style={{
              width: 128,
              height: 128,
              boxShadow: "0 0 20px rgba(48, 123, 117, 0.4)",
            }}
          >
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white border-2 border-white">
              {avatarImg ? (
                <Image src={avatarImg} alt="Avatar" fill className="object-cover" />
              ) : (
                <User size={64} className="text-slate-300" />
              )}
            </div>
          </div>

          {/* Camera Button at Bottom Right */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full text-[var(--primary)] bg-white border-4 border-[var(--primary)] transition-transform active:scale-95"
            style={{
              borderColor: "var(--background)",
              backgroundColor: "var(--primary)",
              color: "white"
            }}
          >
            <Camera size={16} />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Name */}
        <h2 className="mt-5 text-[24px] font-bold text-[var(--text-primary)] tracking-tight">
          Nguyen Van A
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="relative z-10 mt-6 flex justify-center gap-4 px-5">
        {STATS.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-1 flex-col items-center justify-center rounded-[16px] bg-white py-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
          >
            <span
              className="text-[32px] font-bold text-[var(--primary)]"
              style={{ lineHeight: 1 }}
            >
              {value}
            </span>
            <span className="mt-1 text-[14px] font-medium text-[var(--text-tertiary)] lowercase">{label}</span>
          </div>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="relative z-10 px-5 mt-8 space-y-8">

        {/* Personal Information */}
        <div>
          <h3 className="mb-4 text-[14px] font-bold text-[var(--secondary)] uppercase tracking-[1.2px]">
            {t("profile.sections.personal", "Personal Information")}
          </h3>
          <div className="space-y-4">
            <div className="flex border-b border-[var(--border-light)] pb-2 relative">
              <span className="w-[120px] text-sm text-[var(--primary)] opacity-70 capitalize tracking-wide">{t("profile.fields.fullName", "Fullname")}</span>
              <span className="text-sm text-[var(--primary)] opacity-70 tracking-wide">{t("profile.values.fullName", "Nguyen Van A")}</span>
            </div>
            <div className="flex border-b border-[var(--border-light)] pb-2 relative">
              <span className="w-[120px] text-sm text-[var(--primary)] opacity-70 capitalize tracking-wide">{t("profile.fields.email", "Gmail")}</span>
              <span className="text-sm text-[var(--primary)] opacity-70 tracking-wide">{t("profile.values.email", "NguyenVanA@gmail.com")}</span>
            </div>
            <div className="flex border-b border-[var(--border-light)] pb-2 relative">
              <span className="w-[120px] text-sm text-[var(--primary)] opacity-70 capitalize tracking-wide">{t("profile.fields.phone", "Phone")}</span>
              <span className="text-sm text-[var(--primary)] opacity-70 tracking-wide">{t("profile.values.phone", "+8484123*****")}</span>
            </div>
            <div className="flex pb-2 relative">
              <span className="w-[120px] text-sm text-[var(--primary)] opacity-70 capitalize tracking-wide">{t("profile.fields.dob", "Date of birth")}</span>
              <span className="text-sm text-[var(--primary)] opacity-70 tracking-wide">{t("profile.values.dob", "01/01/2004")}</span>
            </div>
          </div>
        </div>

        {/* 3D Body Profile */}
        <div
          className="rounded-[24px] p-4 relative backdrop-blur-[6px] border border-black/5"
          style={{ backgroundColor: "rgba(48, 123, 117, 0.05)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[12px] font-bold uppercase tracking-[1.2px] text-[var(--primary)] opacity-70">
              {t("profile.sections.bodyProfile", "3D Body Profile")}
            </h3>
            <div className="px-2 py-[2px] rounded-full" style={{ backgroundColor: "rgba(48, 123, 117, 0.2)" }}>
              <span className="text-[10px] font-bold text-[var(--primary)]">
                {t("profile.lastScanned", "Last scanned: 2 days ago")}
              </span>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            {/* Height Component */}
            <div
              className="flex-1 rounded-[16px] p-3 flex flex-col gap-1 border border-black/5"
              style={{ backgroundColor: "rgba(48, 123, 117, 0.1)" }}
            >
              <span className="text-[12px] text-[var(--text-tertiary)] font-normal">{t("profile.fields.height", "Height")}</span>
              <div className="flex items-baseline gap-1 h-[28px]">
                <span className="text-[18px] font-bold text-[#666]">182</span>
                <span className="text-[12px] text-[var(--text-tertiary)]">cm</span>
              </div>
            </div>

            {/* Weight Component */}
            <div
              className="flex-1 rounded-[16px] p-3 flex flex-col gap-1 border border-black/5"
              style={{ backgroundColor: "rgba(48, 123, 117, 0.1)" }}
            >
              <span className="text-[12px] text-[var(--text-tertiary)] font-normal">{t("profile.fields.weight", "Weight")}</span>
              <div className="flex items-baseline gap-1 h-[28px]">
                <span className="text-[18px] font-bold text-[#666]">76</span>
                <span className="text-[12px] text-[var(--text-tertiary)]">kg</span>
              </div>
            </div>
          </div>

          {/* Unit Toggle */}
          <div
            className="rounded-[16px] p-1 flex items-center justify-center mb-4"
            style={{ backgroundColor: "rgba(48, 123, 117, 0.05)" }}
          >
            <button
              onClick={() => setMetric(true)}
              className={cn(
                "flex-1 py-2 rounded-[6px] text-[14px] transition-all flex items-center justify-center",
                metric ? "bg-[var(--primary)] text-white shadow-md font-bold" : "text-[var(--text-tertiary)] font-medium"
              )}
            >
              {t("profile.units.metric", "Metric")}
            </button>
            <button
              onClick={() => setMetric(false)}
              className={cn(
                "flex-1 py-2 rounded-[6px] text-[14px] transition-all flex items-center justify-center",
                !metric ? "bg-[var(--primary)] text-white shadow-md font-bold" : "text-[var(--text-tertiary)] font-medium"
              )}
            >
              {t("profile.units.imperial", "Imperial")}
            </button>
          </div>

          {/* Start New Scan Button */}
          <button
            className="w-full rounded-[16px] py-[13px] flex items-center justify-center gap-[8px] border border-[var(--secondary)] transition-colors active:opacity-80"
            style={{ backgroundColor: "rgba(253, 113, 35, 0.1)" }}
            onClick={() => router.push("/avatar/scan")}
          >
            <ScanFace size={15} className="text-[var(--secondary)]" />
            <span className="font-bold text-[14px] text-[var(--secondary)] leading-[20px]">
              {t("profile.actions.startScan", "Start New 3D Scan")}
            </span>
          </button>
        </div>

        {/* Preferences Toggles */}
        <div
          className="rounded-[24px] overflow-hidden backdrop-blur-[6px] border border-black/5"
          style={{ backgroundColor: "rgba(48, 123, 117, 0.05)" }}
        >
          {/* AI Alerts */}
          <div className="flex items-center justify-between p-4" style={{ borderBottom: "1px solid rgba(48, 123, 117, 0.1)" }}>
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center text-[var(--secondary)]"
                style={{ backgroundColor: "rgba(253, 113, 35, 0.1)" }}
              >
                <Sparkles size={20} className="fill-[var(--secondary)] opacity-80" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-slate-800 leading-[20px]">{t("profile.preferences.aiAlerts", "AI Style Alerts")}</span>
                <span className="text-[12px] text-[var(--text-tertiary)] leading-[16px]">{t("profile.preferences.aiAlertsDesc", "New outfit recommendations")}</span>
              </div>
            </div>
            <Switch checked={aiAlerts} onChange={setAiAlerts} />
          </div>

          {/* Public Wardrobe */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center text-[var(--primary)]"
                style={{ backgroundColor: "rgba(48, 123, 117, 0.1)" }}
              >
                <Globe size={20} className="opacity-80" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-slate-800 leading-[20px]">{t("profile.preferences.publicWardrobe", "Public Wardrobe")}</span>
                <span className="text-[12px] text-[var(--text-tertiary)] leading-[16px]">{t("profile.preferences.publicWardrobeDesc", "Let friends see your style")}</span>
              </div>
            </div>
            <Switch checked={publicWardrobe} onChange={setPublicWardrobe} />
          </div>
        </div>

        {/* Sign out */}
        <div className="flex items-center justify-center py-4 rounded-[24px] transition-colors active:bg-gray-100 mt-8 mb-8">
          <button onClick={() => router.push("/login")} className="flex items-center justify-center">
            <span className="text-[14px] font-bold text-[#ef4444] leading-[20px]">{t("auth.logout", "Sign Out")}</span>
          </button>
        </div>
      </div>

      <LangBottomSheet open={langOpen} onClose={() => setLangOpen(false)} />
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
