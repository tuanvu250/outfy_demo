"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Check } from "lucide-react";

type CategoryItem = {
  id: "top" | "bottom" | "dress" | "shoes" | "accessories" | "outerwear";
  emoji: string;
};

const CATEGORY_IDS: CategoryItem[] = [
  { id: "top", emoji: "👕" },
  { id: "bottom", emoji: "👖" },
  { id: "dress", emoji: "👗" },
  { id: "shoes", emoji: "👟" },
  { id: "accessories", emoji: "👜" },
  { id: "outerwear", emoji: "🧥" },
];

// LocalStorage key for upload category
const UPLOAD_CATEGORY_KEY = "outfy_upload_category";

export default function CategoryPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);

  // Handle continue - save category to localStorage
  const handleContinue = () => {
    if (!selected) return;

    // Save category to localStorage
    localStorage.setItem(UPLOAD_CATEGORY_KEY, selected);

    // Navigate to upload page
    router.push("/upload");
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--background)] overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} className="text-[var(--text-primary)]" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-[var(--text-primary)] pr-8">
            {t("upload.category.pageTitle")}
          </h1>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)] leading-snug">
            {t("upload.category.heading")}
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">
            {t("upload.category.subheading")}
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-3">
          {CATEGORY_IDS.map(({ id, emoji }) => {
            const isSelected = selected === id;
            const label = t(`upload.category.${id}`);
            return (
              <button
                key={id}
                onClick={() => setSelected(id)}
                className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 py-10 transition-all ${
                  isSelected
                    ? "border-[var(--secondary)] bg-orange-50"
                    : "border-[var(--border-light)] bg-gray-50 hover:border-gray-300"
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--secondary)] flex items-center justify-center">
                    <Check size={11} className="text-white" strokeWidth={3} />
                  </span>
                )}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isSelected ? "bg-orange-100" : "bg-gray-200"
                  }`}
                >
                  <span className="text-3xl">{emoji}</span>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    isSelected
                      ? "text-[var(--secondary)]"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky bottom button */}
      <div className="px-4 pt-3 pb-6 bg-[var(--background)] border-t border-[var(--border-light)]">
        <button
          onClick={handleContinue}
          disabled={!selected}
          className="w-full py-4 rounded-full bg-[var(--primary)] text-white font-bold text-base flex items-center justify-center gap-2 disabled:opacity-40 active:opacity-90 transition-opacity"
        >
          {t("upload.category.continueToAnalysis")} <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
