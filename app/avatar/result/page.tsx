"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, RotateCw, Loader2, AlertCircle, Box } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BodyGenerationResult, ShapeParams } from "@/lib/types/avatar";

// Store key for passing data between pages
const AVATAR_RESULT_KEY = "outfy_avatar_result";

// Backend API URL - should match NEXT_PUBLIC_API_URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

// Helper to calculate exact background size percentage for modern slider styling
const getGradientPercent = (val: number, min: number, max: number) => {
  // Handle NaN or invalid values
  if (isNaN(val) || !isFinite(val)) {
    return 0;
  }
  // Clamp value between min and max
  const clampedVal = Math.min(Math.max(val, min), max);
  return ((clampedVal - min) / (max - min)) * 100;
};

export default function AvatarResultPage() {
  const router = useRouter();
  const { t } = useTranslation();

  // 3D Model state
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bodyType, setBodyType] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);
  const [avatarPresetCode, setAvatarPresetCode] = useState<string>("");

  // Slider States - initialized with default values
  const [waist, setWaist] = useState(80);
  const [hips, setHips] = useState(95);
  const [shoulders, setShoulders] = useState(45);

  // Load avatar result from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem(AVATAR_RESULT_KEY);

    // Check if data exists and is valid
    if (storedData && storedData !== "undefined" && storedData !== "null") {
      try {
        const result: BodyGenerationResult = JSON.parse(storedData);

        // Validate result has required fields
        if (result && (result.modelUrl || result.previewUrl)) {
          setModelUrl(result.modelUrl);
          setPreviewUrl(result.previewUrl);
          setBodyType(result.bodyType);
          setConfidence(result.confidence);
          setAvatarPresetCode(result.avatarPresetCode);

          // Pre-fill sliders with values from shapeParams
          if (result.shapeParams) {
            const params = result.shapeParams as unknown as ShapeParams;
            // Validate values are valid numbers before setting
            const waistVal = Number(params.waist);
            const hipsVal = Number(params.hip);
            const shouldersVal = Number(params.shoulder);

            setWaist(
              !isNaN(waistVal) && waistVal > 0 ? Math.round(waistVal) : 80,
            );
            setHips(!isNaN(hipsVal) && hipsVal > 0 ? Math.round(hipsVal) : 95);
            setShoulders(
              !isNaN(shouldersVal) && shouldersVal > 0
                ? Math.round(shouldersVal)
                : 45,
            );
          }
        } else {
          // Invalid result data
          console.warn("Invalid avatar result data:", result);
          setError("Invalid avatar data. Please try again.");
        }
      } catch (e) {
        console.error("Failed to parse avatar result:", e);
        setError("Failed to load avatar data. Please try again.");
      }
    } else {
      setError(
        "No avatar data found. Please complete the measurement process.",
      );
    }
    setIsLoading(false);
  }, []);

  // Full model URL for model-viewer
  const fullModelUrl = modelUrl
    ? `${API_BASE_URL.replace("/api/v1", "")}${modelUrl}`
    : null;

  // Handle finish - save final measurements
  const handleFinish = () => {
    // Here you could also call API to save the final avatar configuration
    router.push("/wardrobe");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-dvh bg-white font-sans items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="mt-4 text-slate-600">Loading avatar...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-dvh bg-white font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-8 pb-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-start"
          >
            <ChevronLeft className="w-6 h-6 text-[#0f172a]" />
          </button>
          <span className="text-[18px] font-bold text-[#0f172a] flex-1 text-center mr-10 py-2 tracking-[-0.45px]">
            {t("avatar.scan.editTitle", "3D Avatar")}
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => router.push("/avatar/measurements")}
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold"
            >
              {t("common.retry", "Try Again")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh bg-white font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-8 pb-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-start"
        >
          <ChevronLeft className="w-6 h-6 text-[#0f172a]" />
        </button>
        <span className="text-[18px] font-bold text-[#0f172a] flex-1 text-center mr-10 py-2 tracking-[-0.45px]">
          {t("avatar.scan.editTitle", "Your 3D Avatar")}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-6 overflow-x-hidden">
        {/* 3D Viewer Area */}
        <div className="relative w-full aspect-4/5 max-h-[460px] bg-gradient-to-t from-slate-800 to-slate-900 rounded-[32px] overflow-hidden shadow-lg mt-2 mb-8 mx-auto flex items-center justify-center">
          {fullModelUrl ? (
            <>
              {/* @ts-expect-error - model-viewer is a web component */}
              <model-viewer
                src={fullModelUrl}
                alt={`3D Avatar - ${bodyType}`}
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
              />

              {/* Rotate/View Icon overlay */}
              <div className="absolute right-4 bottom-4 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center pointer-events-none">
                <RotateCw className="text-white/80 w-5 h-5" />
              </div>
            </>
          ) : previewUrl ? (
            // Fallback to preview image if no 3D model
            <div className="relative w-full h-full">
              <img
                src={`${API_BASE_URL.replace("/api/v1", "")}${previewUrl}`}
                alt={`Avatar Preview - ${bodyType}`}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            // No model available
            <div className="text-white/60 text-center p-4">
              <Box className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No 3D model available</p>
            </div>
          )}
        </div>

        {/* Body Type & Confidence Badge */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {bodyType && (
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              {bodyType}
            </span>
          )}
          {confidence > 0 && (
            <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              {Math.round(confidence * 100)}% match
            </span>
          )}
        </div>

        {/* Adjust Proportions Header */}
        <h3 className="text-[18px] font-bold text-[#0f172a] mb-2">
          {t("avatar.scan.adjustProportions", "Adjust Proportions")}
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Fine-tune your avatar to match your body type
        </p>

        {/* Sliders Container */}
        <div className="flex flex-col gap-6 pb-8">
          {/* Waist Slider */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[14px] text-[#94a3b8]">
                {t("avatar.measurements.waist", "Waist")}
              </span>
              <span className="text-[14px] text-secondary font-semibold">
                {waist} cm
              </span>
            </div>
            <div className="relative h-6 flex items-center">
              <input
                type="range"
                min={50}
                max={100}
                value={waist}
                onChange={(e) => setWaist(Number(e.target.value))}
                className="w-full absolute z-20 opacity-0 cursor-ew-resize h-full"
                aria-label="Waist measurement"
              />
              {/* Custom Track */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-primary"
                  style={{ width: `${getGradientPercent(waist, 50, 100)}%` }}
                />
              </div>
              {/* Custom Thumb */}
              <div
                className="absolute w-6 h-6 bg-white border-2 border-primary rounded-full shadow-md z-10 -ml-3"
                style={{ left: `${getGradientPercent(waist, 50, 100)}%` }}
              />
            </div>
          </div>

          {/* Hips Slider */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[14px] text-[#94a3b8]">
                {t("avatar.measurements.hips", "Hips")}
              </span>
              <span className="text-[14px] text-secondary font-semibold">
                {hips} cm
              </span>
            </div>
            <div className="relative h-6 flex items-center">
              <input
                type="range"
                min={70}
                max={130}
                value={hips}
                onChange={(e) => setHips(Number(e.target.value))}
                className="w-full absolute z-20 opacity-0 cursor-ew-resize h-full"
                aria-label="Hips measurement"
              />
              <div className="w-full h-1.5 bg-slate-800 rounded-full relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-primary"
                  style={{ width: `${getGradientPercent(hips, 70, 130)}%` }}
                />
              </div>
              <div
                className="absolute w-6 h-6 bg-white border-2 border-primary rounded-full shadow-md z-10 -ml-3"
                style={{ left: `${getGradientPercent(hips, 70, 130)}%` }}
              />
            </div>
          </div>

          {/* Shoulders Slider */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[14px] text-[#94a3b8]">
                {t("avatar.scan.shoulders", "Shoulders")}
              </span>
              <span className="text-[14px] text-secondary font-semibold">
                {shoulders} cm
              </span>
            </div>
            <div className="relative h-6 flex items-center">
              <input
                type="range"
                min={30}
                max={60}
                value={shoulders}
                onChange={(e) => setShoulders(Number(e.target.value))}
                className="w-full absolute z-20 opacity-0 cursor-ew-resize h-full"
                aria-label="Shoulders measurement"
              />
              <div className="w-full h-1.5 bg-slate-800 rounded-full relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-primary"
                  style={{ width: `${getGradientPercent(shoulders, 30, 60)}%` }}
                />
              </div>
              <div
                className="absolute w-6 h-6 bg-white border-2 border-primary rounded-full shadow-md z-10 -ml-3"
                style={{ left: `${getGradientPercent(shoulders, 30, 60)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Avatar Info */}
        <div className="bg-slate-50 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Avatar Code</span>
            <span className="font-mono text-slate-700">{avatarPresetCode}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pb-6 space-y-3">
          <button
            onClick={handleFinish}
            className="w-full h-14 bg-primary text-white font-bold text-[18px] rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            {t("avatar.scan.finish", "Save & Continue")}
          </button>
          <button
            onClick={() => router.push("/avatar/measurements")}
            className="w-full h-12 bg-slate-100 text-slate-700 font-semibold text-[15px] rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            {t("avatar.scan.retake", "Retake Measurements")}
          </button>
        </div>
      </div>
    </div>
  );
}
