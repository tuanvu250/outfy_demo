"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  RefreshCw,
  Heart,
  Share2,
  Loader2,
  AlertCircle,
  Box,
  Star,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { TryOnResult } from "@/lib/types/tryon";
import {
  regenerateTryOnResult,
  toggleTryOnFavorite,
  getTryOnResultDetail,
} from "@/lib/api/tryon";

const TRYON_RESULT_KEY = "outfy_tryon_result";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function TryOnResultPage() {
  const router = useRouter();
  const { t } = useTranslation();

  // State
  const [result, setResult] = useState<TryOnResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelError, setModelError] = useState(false);

  // Load result from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem(TRYON_RESULT_KEY);
    if (storedData) {
      try {
        const parsedResult = JSON.parse(storedData);
        setResult(parsedResult);
      } catch (e) {
        console.error("Failed to parse try-on result:", e);
        setError(t("tryon.errors.sessionNotFound"));
      }
    } else {
      setError(t("tryon.errors.sessionNotFound"));
    }
    setIsLoading(false);
  }, [t]);

  // Handle regenerate
  const handleRegenerate = async () => {
    if (!result) return;

    setIsRegenerating(true);
    try {
      const newResult = await regenerateTryOnResult(result.sessionId);
      setResult(newResult);
      localStorage.setItem(TRYON_RESULT_KEY, JSON.stringify(newResult));
    } catch (err) {
      console.error("Failed to regenerate:", err);
      setError(t("tryon.errors.generateFailed"));
    } finally {
      setIsRegenerating(false);
    }
  };

  // Handle toggle favorite
  const handleToggleFavorite = async () => {
    if (!result) return;

    setIsTogglingFavorite(true);
    try {
      const updated = await toggleTryOnFavorite(result.sessionId);
      setResult((prev) =>
        prev ? { ...prev, isFavorite: !!updated.isFavorite } : null,
      );
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  // Use modelUrl for 3D model, previewUrl for image
  const modelUrl = result?.modelUrl
    ? result.modelUrl.startsWith("http")
      ? result.modelUrl
      : `${API_BASE_URL.replace("/api/v1", "")}${result.modelUrl}`
    : result?.previewUrl
      ? `${API_BASE_URL.replace("/api/v1", "")}${result.previewUrl}`
      : null;
  const previewImageUrl = result?.previewUrl
    ? result.previewUrl.startsWith("http")
      ? result.previewUrl
      : `${API_BASE_URL.replace("/api/v1", "")}${result.previewUrl}`
    : null;

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-[var(--background)] items-center justify-center">
        <Loader2 className="w-8 h-8 text-[var(--primary)] animate-spin mb-4" />
        <p className="text-gray-600">{t("tryon.result.processing")}</p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="flex flex-col min-h-screen bg-[var(--background)]">
        <div className="flex items-center px-4 pt-6 pb-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100"
            type="button"
          >
            <ArrowLeft size={20} className="text-[var(--text-primary)]" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-[var(--text-primary)]">
            {t("tryon.result.pageTitle")}
          </h1>
          <div className="w-9" />
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">
              {error || t("tryon.errors.sessionNotFound")}
            </p>
            <button
              onClick={() => router.push("/tryon")}
              className="px-6 py-3 bg-[var(--primary)] text-white rounded-full font-semibold"
            >
              {t("common.retry", "Try Again")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="flex items-center px-4 pt-6 pb-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100"
          type="button"
        >
          <ArrowLeft size={20} className="text-[var(--text-primary)]" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-[var(--text-primary)]">
          {t("tryon.result.pageTitle")}
        </h1>
        <button
          onClick={() => router.push("/tryon")}
          className="p-2 rounded-full hover:bg-gray-100"
          type="button"
        >
          <RefreshCw size={20} className="text-[var(--text-primary)]" />
        </button>
      </div>

      {/* 3D Model Viewer */}
      <div className="flex-1 px-4 pb-4">
        <div
          className="w-full rounded-3xl overflow-hidden bg-gradient-to-t from-slate-800 to-slate-900 relative"
          style={{ height: 400 }}
        >
          {!modelError && modelUrl ? (
            <>
              {/* @ts-expect-error model-viewer web component */}
              <model-viewer
                src={modelUrl}
                alt={`3D Try-On - ${result.garmentCategory}`}
                auto-rotate
                camera-controls
                disable-zoom
                touch-action="pan-y"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "transparent",
                }}
                shadow-intensity="1"
                exposure="0.8"
                onError={() => setModelError(true)}
              />
              {/* Rotate Icon overlay */}
              <div className="absolute right-4 bottom-4 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center pointer-events-none">
                <RefreshCw className="text-white/80 w-5 h-5 animate-spin-slow" />
              </div>
            </>
          ) : previewImageUrl ? (
            // Fallback to preview image if no 3D model
            <div className="flex items-center justify-center h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImageUrl}
                alt={`${result.garmentCategory} preview`}
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white/60">
                <Box className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>3D Model not available</p>
              </div>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full">
            <span className="text-xs font-bold text-[var(--primary)]">
              {result.garmentCategory}
            </span>
          </div>

          {/* Fit Score badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold text-[var(--text-primary)]">
              {Math.round(result.fitScore * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-t-3xl px-5 pt-5 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-5" />

        {/* Avatar & Garment Info */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Body Type</p>
              <p className="font-semibold text-[var(--text-primary)]">
                {t(`tryon.avatar.${result.avatarId}`, result.avatarId)}
              </p>
            </div>
            <div className="flex-1 p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Garment</p>
              <p className="font-semibold text-[var(--text-primary)]">
                {result.garmentCategory}
              </p>
            </div>
          </div>
        </div>

        {/* Fit Score Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {t("tryon.result.fitScore")}
            </span>
            <span className="text-sm font-bold text-[var(--primary)]">
              {Math.round(result.fitScore * 100)}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
              style={{ width: `${result.fitScore * 100}%` }}
            />
          </div>
        </div>

        {/* Note */}
        {result.note && (
          <div className="mb-4 p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">
              {t("tryon.result.note")}
            </p>
            <p className="text-sm text-[var(--text-primary)]">{result.note}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="flex-1 py-3 bg-gray-100 text-[var(--text-primary)] rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 disabled:opacity-50"
          >
            {isRegenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <RefreshCw size={18} />
            )}
            {t("tryon.result.regenerate")}
          </button>

          <button
            onClick={handleToggleFavorite}
            disabled={isTogglingFavorite}
            className={`py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 ${
              result.isFavorite
                ? "bg-red-50 text-red-500"
                : "bg-gray-100 text-[var(--text-primary)]"
            }`}
          >
            {isTogglingFavorite ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Heart
                size={18}
                className={result.isFavorite ? "fill-current" : ""}
              />
            )}
          </button>

          <button className="py-3 px-4 bg-gray-100 text-[var(--text-primary)] rounded-xl font-semibold flex items-center justify-center">
            <Share2 size={18} />
          </button>
        </div>

        {/* Try Another Button */}
        <button
          onClick={() => router.push("/tryon")}
          className="w-full mt-3 py-3 bg-[var(--primary)] text-white rounded-xl font-semibold"
        >
          {t("tryon.result.tryAnother")}
        </button>
      </div>
    </div>
  );
}
