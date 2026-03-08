"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Ruler, Sparkles } from "lucide-react";

const FIT_OPTIONS = [
  { key: "oversized", label: "Rộng rãi" },
  { key: "regular", label: "Thường" },
  { key: "slim", label: "Ôm" },
  { key: "cropped", label: "Ngắn" },
];

interface Measurement {
  key: string;
  labelKey: string;
  value: string;
  unit: string;
}

export default function PreviewDetailPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const [measurements, setMeasurements] = useState<Measurement[]>([
    { key: "chestWidth", labelKey: "upload.previewDetail.chestWidth", value: "58", unit: "cm" },
    { key: "bodyLength", labelKey: "upload.previewDetail.bodyLength", value: "70", unit: "cm" },
    { key: "sleeveLength", labelKey: "upload.previewDetail.sleeveLength", value: "62", unit: "cm" },
  ]);
  const [selectedFit, setSelectedFit] = useState("oversized");

  const updateMeasurement = (key: string, value: string) => {
    setMeasurements((prev) =>
      prev.map((m) => (m.key === key ? { ...m, value } : m))
    );
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
            {t("upload.previewDetail.pageTitle")}
          </h1>
        </div>

        <div className="space-y-7">
          {/* AI suggestion badge */}
          <div className="flex items-center gap-2 bg-[var(--primary)]/8 rounded-2xl px-4 py-3">
            <Sparkles size={16} className="text-[var(--primary)] flex-shrink-0" />
            <p className="text-xs text-[var(--primary)] font-medium">
              {t("upload.previewDetail.aiSuggestion")}
            </p>
          </div>

          {/* Measurement fields */}
          <div>
            <label className="block text-xs font-bold text-[var(--text-tertiary)] tracking-widest uppercase mb-3">
              {t("upload.previewDetail.technicalSpecs")}
            </label>
            <div className="space-y-3">
              {measurements.map(({ key, labelKey, value, unit }) => (
                <div
                  key={key}
                  className="flex items-center justify-between bg-white rounded-2xl border border-[var(--border-light)] px-4 py-3.5 gap-4"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Ruler size={16} className="text-[var(--primary)] flex-shrink-0" />
                    <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                      {t(labelKey)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <input
                      type="number"
                      value={value}
                      min={0}
                      max={999}
                      onChange={(e) => updateMeasurement(key, e.target.value)}
                      className="w-16 text-right text-sm font-bold text-[var(--text-primary)] bg-gray-50 border border-[var(--border-light)] rounded-xl px-2 py-1.5 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                    />
                    <span className="text-sm font-medium text-[var(--text-tertiary)]">{unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fit / Silhouette */}
          <div>
            <label className="block text-xs font-bold text-[var(--text-tertiary)] tracking-widest uppercase mb-3">
              {t("upload.previewDetail.silhouette")}
            </label>
            <div className="flex flex-wrap gap-2">
              {FIT_OPTIONS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setSelectedFit(key)}
                  className={`px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                    selectedFit === key
                      ? "border-[var(--secondary)] bg-[var(--secondary)] text-white"
                      : "border-[var(--border-light)] bg-white text-[var(--text-secondary)] hover:border-gray-400"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom button */}
      <div className="px-4 pt-3 pb-6 bg-[var(--background)] border-t border-[var(--border-light)]">
        <button
          onClick={() => router.push("/upload/processing")}
          className="w-full py-4 rounded-full bg-[var(--primary)] text-white font-bold text-base flex items-center justify-center gap-2 active:opacity-90 transition-opacity"
        >
          {t("upload.previewDetail.confirmBtn")}
          <Sparkles size={18} />
        </button>
      </div>
    </div>
  );
}
