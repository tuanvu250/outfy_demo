"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ChevronLeft, ChevronRight, RotateCcw, CheckCircle, SlidersHorizontal, RefreshCw, Minus } from "lucide-react";

const PREVIEW_VIEW_KEYS = ["front", "back", "side"] as const;

const PREVIEW_IMAGES: Record<string, string> = {
  front: "/images/front.png",
  back: "/images/back.png",
  side: "/images/front.png",
};

export default function PreviewPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  const prev = () => setCurrentIndex((i) => (i === 0 ? PREVIEW_VIEW_KEYS.length - 1 : i - 1));
  const next = () => setCurrentIndex((i) => (i === PREVIEW_VIEW_KEYS.length - 1 ? 0 : i + 1));
  const rotate = () => setRotation((r) => r + 90);

  const currentKey = PREVIEW_VIEW_KEYS[currentIndex];

  return (
    <div className="flex flex-col h-screen bg-[#eaf4f3] overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-4 pt-6 pb-3 flex-shrink-0">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-white/60">
          <ArrowLeft size={20} className="text-[var(--text-primary)]" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-[var(--text-primary)]">
          {t("upload.preview.pageTitle")}
        </h1>
        <button className="p-2 rounded-full hover:bg-white/60">
          <Minus size={20} className="text-[var(--text-primary)]" />
        </button>
      </div>

      {/* Image Viewer */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 pt-2 pb-4 min-h-0">
        <div
          className="w-full max-w-sm rounded-3xl overflow-hidden relative flex items-center justify-center shadow-lg"
          style={{ height: 360, background: "linear-gradient(145deg, #e6f2f1 0%, #d4eae8 100%)" }}
        >
          <div
            className="w-full h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PREVIEW_IMAGES[currentKey]}
              alt={currentKey}
              className="w-full h-full object-contain"
            />
          </div>

          <span className="absolute top-3 left-3 text-xs font-semibold text-[var(--primary)] bg-white/80 rounded-full px-3 py-1">
            {t(`upload.preview.${currentKey}`)}
          </span>

          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white active:scale-95 transition-all"
          >
            <ChevronLeft size={18} className="text-[var(--text-primary)]" />
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white active:scale-95 transition-all"
          >
            <ChevronRight size={18} className="text-[var(--text-primary)]" />
          </button>

          <button
            onClick={rotate}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white active:scale-95 transition-all"
          >
            <RotateCcw size={16} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        <div className="flex gap-1.5 mt-3">
          {PREVIEW_VIEW_KEYS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentIndex ? "bg-[var(--primary)] w-5" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom sheet - sticky */}
      <div className="bg-white rounded-t-3xl px-6 pt-5 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex-shrink-0">
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-5" />

        <div className="text-center mb-5">
          <h2 className="text-xl font-bold" style={{ color: "#C8860A" }}>
            {t("upload.preview.generationComplete")}
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">
            {t("upload.preview.generationSubtitle")}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push("/wardrobe")}
            className="w-full py-4 rounded-full bg-[var(--primary)] text-white font-bold text-base flex items-center justify-center gap-2 active:opacity-90 transition-opacity"
          >
            <CheckCircle size={20} />
            {t("upload.preview.addToWardrobe")}
          </button>

          <button
            onClick={() => router.push("/upload/attributes")}
            className="w-full py-4 rounded-full border border-[var(--border-light)] bg-white text-[var(--text-primary)] font-semibold text-base flex items-center justify-center gap-2 hover:bg-gray-50 active:opacity-90 transition-all"
          >
            <SlidersHorizontal size={18} className="text-[var(--text-secondary)]" />
            {t("upload.preview.editAttributes")}
          </button>

          <button
            onClick={() => router.push("/upload/processing")}
            className="w-full py-3 flex items-center justify-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
          >
            <RefreshCw size={15} />
            {t("upload.preview.regenerate")}
          </button>
        </div>
      </div>
    </div>
  );
}
