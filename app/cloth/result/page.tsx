"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, RefreshCw, CheckCircle } from "lucide-react";
import { ClothingAnalysisResult, CLOTH_RESULT_KEY } from "@/lib/types/cloth";

export default function ClothResultPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [result, setResult] = useState<ClothingAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modelError, setModelError] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CLOTH_RESULT_KEY);
    if (saved) {
      try {
        setResult(JSON.parse(saved));
      } catch {
        setError("Invalid result data");
      }
    } else {
      setError("No analysis result found");
    }
  }, []);

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-[var(--background)]">
        <div className="flex items-center px-4 pt-6 pb-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} className="text-[var(--text-primary)]" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-[var(--text-primary)]">
            {t("cloth.result.pageTitle")}
          </h1>
          <div className="w-9" />
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => router.push("/cloth/analyze")}
              className="px-6 py-3 bg-[var(--primary)] text-white rounded-full font-semibold"
            >
              {t("cloth.result.uploadAnother")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col min-h-screen bg-[var(--background)]">
        <div className="flex items-center px-4 pt-6 pb-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} className="text-[[var(--text-primary)]" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-[var(--text-primary)]">
            {t("cloth.result.pageTitle")}
          </h1>
          <div className="w-9" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const modelUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}${result.previewUrl}`;

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
          {t("cloth.result.pageTitle")}
        </h1>
        <button
          onClick={() => router.push("/cloth/analyze")}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <RefreshCw size={20} className="text-[var(--text-primary)]" />
        </button>
      </div>

      {/* 3D Model Viewer */}
      <div className="flex-1 px-4 pb-4">
        <div
          className="w-full rounded-3xl overflow-hidden bg-gray-100 relative"
          style={{ height: 400 }}
        >
          {!modelError && result.previewUrl ? (
            /* @ts-expect-error model-viewer web component */
            <model-viewer
              src={modelUrl}
              alt={`3D ${result.garmentCategory} model`}
              auto-rotate
              camera-controls
              style={{ width: "100%", height: "100%" }}
              onError={() => setModelError(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <div className="text-center">
                <p className="text-gray-400 mb-2">3D Model not available</p>
                <p className="text-xs text-gray-300">{result.previewUrl}</p>
              </div>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full">
            <span className="text-xs font-bold text-[var(--primary)]">
              {result.garmentCategory}
            </span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-t-3xl px-5 pt-5 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-5" />

        {/* Category & Template */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1">
            {result.garmentCategory}
          </h2>
          <p className="text-sm text-[var(--text-tertiary)]">
            {t("cloth.result.template")}: {result.templateCode}
          </p>
        </div>

        {/* Confidence */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {t("cloth.result.confidence")}
            </span>
            <span className="text-sm font-bold text-[var(--secondary)]">
              {(result.confidence * 100).toFixed(0)}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--secondary)]"
              style={{ width: `${result.confidence * 100}%` }}
            />
          </div>
        </div>

        {/* Attributes */}
        {Object.keys(result.attributes).length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
              {t("cloth.result.attributes")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(result.attributes).map(([key, value]) => (
                <span
                  key={key}
                  className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-[var(--text-secondary)]"
                >
                  {key}: {String(value)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Parameters */}
        {Object.keys(result.garmentParameters).length > 0 && (
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
              {t("cloth.result.parameters")}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(result.garmentParameters).map(([key, value]) => (
                <div
                  key={key}
                  className="p-2 bg-gray-50 rounded-xl text-center"
                >
                  <p className="text-xs text-[var(--text-tertiary)] capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full py-4 rounded-full bg-[var(--primary)] text-white font-bold text-base flex items-center justify-center gap-2 active:opacity-90 transition-opacity">
            <CheckCircle size={20} />
            {t("cloth.result.tryOn")}
          </button>

          <button
            onClick={() => router.push("/cloth/analyze")}
            className="w-full py-3 flex items-center justify-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
          >
            <RefreshCw size={16} />
            {t("cloth.result.uploadAnother")}
          </button>
        </div>
      </div>
    </div>
  );
}

