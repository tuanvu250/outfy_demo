"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { analyzeClothing } from "@/lib/api/cloth";
import { analyzeClothingSchema } from "@/lib/utils/validators";
import { CLOTH_RESULT_KEY, ClothingAnalysisResult } from "@/lib/types/cloth";

export default function ClothAnalyzePage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ClothingAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setError(null);
    setResult(null);

    const validation = analyzeClothingSchema.safeParse({
      imageUrl,
      fileName: fileName || undefined,
    });

    if (!validation.success) {
      setError(t("cloth.analyze.invalidUrl"));
      return;
    }

    setIsLoading(true);

    try {
      const data = await analyzeClothing({
        imageUrl,
        fileName: fileName || undefined,
      });
      setResult(data);
      // Save to localStorage for result page
      localStorage.setItem(CLOTH_RESULT_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Analysis error:", err);
      setError(
        err instanceof Error ? err.message : t("cloth.analyze.error")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="flex items-center px-4 pt-6 pb-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} className="text-[var(--text-primary)]" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-[var(--text-primary)]">
          {t("cloth.analyze.title")}
        </h1>
        <div className="w-9" />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-6">
        {/* Image URL Input */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
            {t("cloth.analyze.imageUrl")}
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder={t("cloth.analyze.imageUrlPlaceholder")}
            className="w-full h-14 rounded-2xl border border-[var(--border-light)] bg-white px-4 text-sm outline-none transition-all placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </div>

        {/* File Name Input */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">
            {t("cloth.analyze.fileName")}
          </label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder={t("cloth.analyze.fileNamePlaceholder")}
            className="w-full h-14 rounded-2xl border border-[var(--border-light)] bg-white px-4 text-sm outline-none transition-all placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
          />
          <p className="text-xs text-[var(--text-tertiary)] mt-2">
            {t("cloth.analyze.fileNameHint")}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-3 mb-5 bg-red-50 text-red-600 rounded-xl">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Success Message */}
        {result && (
          <div className="flex flex-col gap-3 p-4 mb-5 bg-green-50 rounded-xl">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle size={18} />
              <span className="text-sm font-semibold">
                {t("cloth.analyze.success")}
              </span>
            </div>
            <div className="text-sm text-green-600">
              <p>
                {t("cloth.result.category")}: {result.garmentCategory}
              </p>
              <p>
                {t("cloth.result.confidence")}:{" "}
                {(result.confidence * 100).toFixed(0)}%
              </p>
            </div>
            <button
              onClick={() => router.push("/cloth/result")}
              className="w-full py-3 mt-2 bg-[var(--primary)] text-white font-semibold rounded-xl"
            >
              {t("cloth.result.view3DModel")}
            </button>
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={isLoading || !imageUrl}
          className="w-full h-14 rounded-full bg-[var(--primary)] text-white font-bold text-base flex items-center justify-center gap-2 active:opacity-90 transition-opacity disabled:opacity-40"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              {t("cloth.analyze.analyzing")}
            </>
          ) : (
            t("cloth.analyze.analyzeBtn")
          )}
        </button>
      </div>
    </div>
  );
}

