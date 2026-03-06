"use client";

import { useState, useRef } from "react";
import { User, Camera, LogOut, ChevronRight, Settings, ChevronDown, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import GB from "country-flag-icons/react/3x2/GB";
import VN from "country-flag-icons/react/3x2/VN";
import Image from "next/image";

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
            className="fixed inset-0 z-60 bg-black/40"
            onClick={onClose}
          />
          <motion.div
            key="lang-sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-70 rounded-t-3xl bg-white px-6 pb-10 pt-5 shadow-2xl"
          >
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-[#E2E8F0]" />
            <h3 className="mb-5 text-lg font-bold" style={{ color: "#307B75" }}>
              {t("lang.choosePicker", "Chọn ngôn ngữ")}
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
                  {lang === code && <Check size={20} stroke="#307B75" strokeWidth={2} />}
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

export default function ProfilePage() {
  const { t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const [avatarImg, setAvatarImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const STATS = [
    { label: t("profile.stats.clothing", "Trang phục"), value: "0" },
    { label: t("profile.stats.outfits", "Outfits"), value: "0" },
    { label: t("profile.stats.favorites", "Yêu thích"), value: "0" },
  ];

  const SECTIONS = [
    {
      title: t("profile.sections.personal", "Thông tin cá nhân"),
      items: [
        { label: t("profile.fields.fullName", "Họ và tên"), value: "Nguyen Van A" },
        { label: t("profile.fields.email", "Email"), value: "user@outfy.vn" },
        { label: t("profile.fields.phone", "Điện thoại"), value: t("common.notUpdated", "Chưa cập nhật") },
      ],
    },
    {
      title: t("profile.sections.bodyProfile", "Hồ sơ vóc dáng"),
      items: [
        { label: t("profile.fields.height", "Chiều cao"), value: t("common.notUpdated", "Chưa cập nhật") },
        { label: t("profile.fields.weight", "Cân nặng"), value: t("common.notUpdated", "Chưa cập nhật") },
      ],
    },
    {
      title: t("profile.sections.preferences", "Tuỳ chọn"),
      items: [
        { label: t("profile.fields.language", "Ngôn ngữ"), value: t("profile.languageValue", "Tiếng Việt") },
        { label: t("profile.fields.notifications", "Thông báo"), value: t("common.on", "Bật") },
      ],
    },
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setAvatarImg(imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
        {/* Language pill */}
        <LangBadge onClick={() => setLangOpen(true)} />
        {/* Message button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-white"
          style={{
            background: "#307B75",
            boxShadow: "0 4px 4px rgba(0,0,0,0.3)",
          }}
        >
          <Settings size={18} />
        </button>
      </div>

      {/* Avatar */}
      <div className="mt-4 flex flex-col items-center">
        <div className="relative">
          {/* Outer teal ring */}
          <div
            className="flex items-center justify-center rounded-full p-1"
            style={{
              width: 128,
              height: 128,
              background: "#307B75",
              boxShadow: "0 0 15px rgba(48,123,117,0.4)",
            }}
          >
            {/* White inner circle */}
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white">
              {avatarImg ? (
                <Image src={avatarImg} alt="Avatar" fill className="object-cover" />
              ) : (
                <User size={72} className="text-gray-300" />
              )}
            </div>
          </div>
          {/* Camera button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform active:scale-95"
            style={{
              background: "#307B75",
              border: "4px solid #FD7123",
            }}
          >
            <Camera size={16} />
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Name */}
        <h2 className="mt-4 text-2xl font-bold tracking-[-0.5px] text-[var(--text-primary)]">
          Nguyen Van A
        </h2>
      </div>

      {/* Stats cards */}
      <div className="mt-8 flex justify-center gap-3 px-4">
        {STATS.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-white py-5"
            style={{
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <span
              className="text-4xl font-bold"
              style={{ color: "#307B75", lineHeight: 1 }}
            >
              {value}
            </span>
            <span className="mt-1 text-[13px] text-[var(--text-tertiary)]">{label}</span>
          </div>
        ))}
      </div>

      {/* Info sections */}
      {SECTIONS.map(({ title, items }) => (
        <div key={title} className="mt-8 px-4">
          <h3 className="mb-3 text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            {title}
          </h3>
          <div className="overflow-hidden rounded-2xl border border-[var(--border-light)] bg-white">
            {items.map(({ label, value }, i) => (
              <div
                key={label}
                className={cn(
                  "flex items-center justify-between px-4 py-3",
                  i < items.length - 1 ? "border-b border-[var(--border-light)]" : ""
                )}
              >
                <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
                <div className="flex items-center gap-2 text-[var(--text-tertiary)]">
                  <span className="text-sm">{value}</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Sign out */}
      <div className="mt-8 px-4">
        <button className="flex w-full items-center justify-center gap-2 py-2">
          <LogOut size={16} className="text-red-500" />
          <span className="text-sm font-bold text-red-500">{t("auth.logout", "Đăng xuất")}</span>
        </button>
      </div>

      <LangBottomSheet open={langOpen} onClose={() => setLangOpen(false)} />
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

