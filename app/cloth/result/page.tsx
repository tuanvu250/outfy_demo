"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  Loader2,
  AlertCircle,
  Archive,
} from "lucide-react";
import {
  ClothingAnalysisResult,
  CLOTH_RESULT_KEY,
  Season,
} from "@/lib/types/cloth";
import { addToWardrobe } from "@/lib/api/cloth";

export default function ClothResultPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [result, setResult] = useState<ClothingAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modelError, setModelError] = useState(false);

  // Add to wardrobe state
  const [userId, setUserId] = useState("");
  const [season, setSeason] = useState<Season | "">("");
  const [notes, setNotes] = useState("");
  const [isAddingToWardrobe, setIsAddingToWardrobe] = useState(false);
  const [addedToWardrobe, setAddedToWardrobe] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

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

  const handleAddToWardrobe = async () => {
    const userIdNum = parseInt(userId, 10);
    if (!result || isNaN(userIdNum) || userIdNum < 1) {
      setAddError(t("cloth.analyze.requiredUserId"));
      return;
    }

    setIsAddingToWardrobe(true);
    setAddError(null);

    try {
      await addToWardrobe({
        clothingItemId: result.clothingItemId,
        userId: userIdNum,
        season: season || undefined,
        notes: notes || undefined,
      });
      setAddedToWardrobe(true);
    } catch (err) {
      console.error("Add to wardrobe error:", err);
      setAddError(
        err instanceof Error
          ? err.message
          : t("cloth.result.addToWardrobeError"),
      );
    } finally {
      setIsAddingToWardrobe(false);
    }
  };

  if (error) {
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
              type="button"
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
            type="button"
          >
            <ArrowLeft size={20} className="text-[var(--text-primary)]" />
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
          type="button"
        >
          <ArrowLeft size={20} className="text-[var(--text-primary)]" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-[var(--text-primary)]">
          {t("cloth.result.pageTitle")}
        </h1>
        <button
          onClick={() => router.push("/cloth/analyze")}
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
          {!modelError && result.previewUrl ? (
            <>
              {/* @ts-expect-error model-viewer web component */}
              <model-viewer
                src={modelUrl}
                alt={`3D ${result.garmentCategory} model`}
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
          <p className="text-sm text-[var(--text-tertiary)]">
            {t("cloth.result.color")}: {result.attributes.color || "N/A"}
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

        {/* Add to Wardrobe Section */}
        {!addedToWardrobe ? (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              {t("cloth.result.addToWardrobe")}
            </h3>

            {/* User ID Input */}
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder={t("cloth.analyze.userIdPlaceholder")}
              className="w-full h-12 rounded-xl border border-[var(--border-light)] bg-white px-4 text-sm outline-none transition-all placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary)]"
            />

            {/* Season Select */}
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value as Season)}
              className="w-full h-12 rounded-xl border border-[var(--border-light)] bg-white px-4 text-sm outline-none transition-all focus:border-[var(--primary)]"
            >
              <option value="">{t("cloth.result.selectSeason")}</option>
              <option value="SPRING">Spring</option>
              <option value="SUMMER">Summer</option>
              <option value="FALL">Fall</option>
              <option value="WINTER">Winter</option>
            </select>

            {/* Notes Input */}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t("cloth.result.notesPlaceholder")}
              rows={2}
              className="w-full rounded-xl border border-[var(--border-light)] bg-white px-4 py-2 text-sm outline-none transition-all placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary)] resize-none"
            />

            {/* Add Error */}
            {addError && (
              <div className="flex items-center gap-2 p-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                <span>{addError}</span>
              </div>
            )}

            <button
              onClick={handleAddToWardrobe}
              disabled={isAddingToWardrobe || !userId}
              className="w-full py-3 rounded-full bg-[var(--primary)] text-white font-bold text-base flex items-center justify-center gap-2 active:opacity-90 transition-opacity disabled:opacity-40"
              type="button"
            >
              {isAddingToWardrobe ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {t("cloth.result.addingToWardrobe")}
                </>
              ) : (
                <>
                  <Archive size={18} />
                  {t("cloth.result.addToWardrobe")}
                </>
              )}
            </button>
          </div>
        ) : (
          /* Added Success */
          <div className="flex flex-col items-center gap-3 p-4 bg-green-50 rounded-xl">
            <CheckCircle size={32} className="text-green-600" />
            <span className="text-green-700 font-semibold">
              {t("cloth.result.addedToWardrobe")}
            </span>
            <button
              onClick={() => router.push("/wardrobe")}
              className="text-[var(--primary)] text-sm font-medium"
              type="button"
            >
              {t("common.viewAll")}
            </button>
          </div>
        )}

        {/* Upload Another Button */}
        <button
          onClick={() => router.push("/cloth/analyze")}
          className="w-full py-3 mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
          type="button"
        >
          <RefreshCw size={16} />
          {t("cloth.result.uploadAnother")}
        </button>
      </div>
    </div>
  );
}
