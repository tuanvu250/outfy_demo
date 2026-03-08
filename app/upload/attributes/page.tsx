"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Palette, Sparkles } from "lucide-react";

const SWATCHES = [
  { name: "Black", hex: "#111111" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Light Gray", hex: "#D1D5DB" },
  { name: "Navy", hex: "#1E3A5F" },
  { name: "Blue", hex: "#2563EB" },
  { name: "Red", hex: "#EF4444" },
];

const MATERIALS = ["Cotton", "Denim", "Leather", "Silk", "Polyester", "Linen"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function AttributesPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>("Cotton");
  const [brand, setBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState<string | null>("M");

  const toggleColor = (hex: string) =>
    setSelectedColors((prev) =>
      prev.includes(hex) ? prev.filter((c) => c !== hex) : [...prev, hex]
    );

  return (
    <div className="flex flex-col h-screen bg-[var(--background)] overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft size={20} className="text-[var(--text-primary)]" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-[var(--text-primary)] pr-8">
            {t("upload.attributes.pageTitle")}
          </h1>
        </div>

        <div className="space-y-7">
          {/* Color Swatches */}
          <div>
            <label className="block text-xs font-bold text-[var(--text-tertiary)] tracking-widest uppercase mb-3">
              {t("upload.attributes.colorSwatches")}
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              <button className="w-10 h-10 rounded-full border-2 border-[var(--primary)] flex items-center justify-center bg-white">
                <Palette size={18} className="text-[var(--primary)]" />
              </button>
              {SWATCHES.map(({ name, hex }) => {
                const isSelected = selectedColors.includes(hex);
                return (
                  <button
                    key={hex}
                    title={name}
                    onClick={() => toggleColor(hex)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      isSelected ? "border-[var(--primary)] scale-105 shadow" : "border-transparent"
                    } ${hex === "#FFFFFF" ? "border-gray-200" : ""}`}
                    style={{ backgroundColor: hex }}
                  />
                );
              })}
            </div>
          </div>

          {/* Material */}
          <div>
            <label className="block text-xs font-bold text-[var(--text-tertiary)] tracking-widest uppercase mb-3">
              {t("upload.attributes.material")}
            </label>
            <div className="flex flex-wrap gap-2">
              {MATERIALS.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMaterial(m)}
                  className={`px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                    selectedMaterial === m
                      ? "border-[var(--secondary)] bg-[var(--secondary)] text-white"
                      : "border-[var(--border-light)] bg-white text-[var(--text-secondary)] hover:border-gray-400"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-xs font-bold text-[var(--text-tertiary)] tracking-widest uppercase mb-3">
              {t("upload.attributes.brand")}
            </label>
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder={t("upload.attributes.brandPlaceholder")}
              className="w-full rounded-2xl border border-[var(--border-light)] bg-gray-50 px-4 py-4 text-sm text-[var(--text-primary)] placeholder:text-gray-400 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </div>

          {/* Garment Size */}
          <div>
            <label className="block text-xs font-bold text-[var(--text-tertiary)] tracking-widest uppercase mb-3">
              {t("upload.attributes.garmentSize")}
            </label>
            <div className="flex gap-2 flex-wrap">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-12 h-12 rounded-full border text-sm font-semibold transition-all ${
                    selectedSize === s
                      ? "border-[var(--secondary)] bg-[var(--secondary)] text-white"
                      : "border-[var(--border-light)] bg-white text-[var(--text-secondary)] hover:border-gray-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom button */}
      <div className="px-4 pt-3 pb-6 bg-[var(--background)] border-t border-[var(--border-light)]">
        <button
          onClick={() => router.push("/upload/preview-detail")}
          className="w-full py-4 rounded-full bg-[var(--primary)] text-white font-bold text-base flex items-center justify-center gap-2 active:opacity-90 transition-opacity"
        >
          {t("upload.category.continueToAnalysis")} <span aria-hidden>→</span>
          <Sparkles size={18} />
        </button>
      </div>
    </div>
  );
}
