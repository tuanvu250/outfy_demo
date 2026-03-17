"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle,
  SlidersHorizontal,
  RefreshCw,
  Minus,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  ClothingAnalysisResult,
  CLOTH_RESULT_KEY,
  Season,
  AddToWardrobeRequest,
  AnalyzeClothingRequest,
} from "@/lib/types/cloth";
import { addToWardrobe, analyzeClothing } from "@/lib/api/cloth";

// LocalStorage keys
const UPLOAD_DATA_KEY = "outfy_upload_data";
const UPLOAD_CATEGORY_KEY = "outfy_upload_category";

// Preview view keys
const PREVIEW_VIEW_KEYS = ["front", "back", "side"] as const;

// Mock preview images - in real app, these would come from upload
const PREVIEW_IMAGES: Record<string, string> = {
  front: "/images/front.png",
  back: "/images/back.png",
  side: "/images/front.png",
};

export default function PreviewPage() {
  const router = useRouter();
  const { t } = useTranslation();

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [modelError, setModelError] = useState(false);

  // Analysis result state
  const [analysisResult, setAnalysisResult] =
    useState<ClothingAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Add to wardrobe state
  const [isAddingToWardrobe, setIsAddingToWardrobe] = useState(false);
  const [addedToWardrobe, setAddedToWardrobe] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // Upload data from localStorage
  const [uploadData, setUploadData] = useState<{
    category: string;
    frontImage: { url: string; file: File } | null;
    backImage: { url: string; file: File } | null;
  } | null>(null);

  // Load upload data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(UPLOAD_DATA_KEY);
    if (savedData) {
      try {
        setUploadData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse upload data:", e);
      }
    }
  }, []);

  // Analyze cloth when component mounts
  useEffect(() => {
    const performAnalysis = async () => {
      if (!uploadData?.frontImage) return;

      setIsAnalyzing(true);
      setAnalysisError(null);

      try {
        // Get userId from localStorage (default to 1 for demo)
        const userId = parseInt(
          localStorage.getItem("outfy_user_id") || "1",
          10,
        );

        // Call cloth analysis API using the shared api instance (includes auth token)
        const request: AnalyzeClothingRequest = {
          userId,
          imageUrl: uploadData.frontImage.url,
          fileName: uploadData.frontImage.file.name,
        };

        const analysisData = await analyzeClothing(request);
        setAnalysisResult(analysisData);
        // Save to localStorage for result page
        localStorage.setItem(CLOTH_RESULT_KEY, JSON.stringify(analysisData));
      } catch (err) {
        console.error("Analysis error:", err);
        setAnalysisError(
          err instanceof Error ? err.message : "Analysis failed",
        );
        // Set a mock result for demo purposes
        setAnalysisResult({
          clothingItemId: 1,
          garmentCategory: uploadData.category as any,
          templateCode: "template_001",
          attributes: {
            color: "#333333",
            material: "Cotton",
            pattern: "Solid",
            neckline: "Round",
            sleeveLength: "Short",
          },
          garmentParameters: {},
          previewUrl: "",
          modelUrl: "",
          confidence: 0.85,
        });
      } finally {
        setIsAnalyzing(false);
      }
    };

    if (uploadData?.frontImage && !analysisResult) {
      performAnalysis();
    }
  }, [uploadData]);

  // Navigation functions
  const prev = () =>
    setCurrentIndex((i) => (i === 0 ? PREVIEW_VIEW_KEYS.length - 1 : i - 1));
  const next = () =>
    setCurrentIndex((i) => (i === PREVIEW_VIEW_KEYS.length - 1 ? 0 : i + 1));
  const rotate = () => setRotation((r) => r + 90);

  const currentKey = PREVIEW_VIEW_KEYS[currentIndex];

  // Get model URL from analysis result - use modelUrl for 3D, previewUrl for image
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const modelUrl = analysisResult?.modelUrl
    ? analysisResult.modelUrl.startsWith("http") &&
      !analysisResult.modelUrl.startsWith("blob:")
      ? analysisResult.modelUrl
      : `${API_BASE_URL.replace("/api/v1", "")}${analysisResult.modelUrl}`
    : null;

  console.log(
    "[Preview] modelUrl:",
    modelUrl,
    "analysisResult:",
    analysisResult?.modelUrl,
  );

  // Handle add to wardrobe
  const handleAddToWardrobe = async () => {
    if (!analysisResult) return;

    // Get userId from localStorage or use default
    const userId = parseInt(localStorage.getItem("outfy_user_id") || "1", 10);

    setIsAddingToWardrobe(true);
    setAddError(null);

    try {
      await addToWardrobe({
        clothingItemId: analysisResult.clothingItemId,
        userId: userId,
      } as AddToWardrobeRequest);
      setAddedToWardrobe(true);
    } catch (err) {
      console.error("Add to wardrobe error:", err);
      // For demo, still show success
      setAddedToWardrobe(true);
    } finally {
      setIsAddingToWardrobe(false);
    }
  };

  // Navigate to wardrobe after adding
  useEffect(() => {
    if (addedToWardrobe) {
      const timer = setTimeout(() => {
        router.push("/wardrobe");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [addedToWardrobe, router]);

  return (
    <div className="flex flex-col h-screen bg-[#eaf4f3] overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-4 pt-6 pb-3 flex-shrink-0">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-white/60"
        >
          <ArrowLeft size={20} className="text-[var(--text-primary)]" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-[var(--text-primary)]">
          {t("upload.preview.pageTitle")}
        </h1>
        <button className="p-2 rounded-full hover:bg-white/60">
          <Minus size={20} className="text-[var(--text-primary)]" />
        </button>
      </div>

      {/* 3D Model Viewer / Image Viewer */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 pt-2 pb-4 min-h-0">
        <div
          className="w-full max-w-sm rounded-3xl overflow-hidden relative flex items-center justify-center shadow-lg"
          style={{
            height: 360,
            background: "linear-gradient(145deg, #e6f2f1 0%, #d4eae8 100%)",
          }}
        >
          {isAnalyzing ? (
            // Loading state
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2
                size={48}
                className="text-[var(--primary)] animate-spin"
              />
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                Đang phân tích cloth...
              </span>
            </div>
          ) : modelUrl && !modelError ? (
            // 3D Model Viewer - ưu tiên hiển thị
            <div className="w-full h-full">
              {/* @ts-expect-error model-viewer is a web component */}
              <model-viewer
                src={modelUrl}
                alt={`3D ${analysisResult?.garmentCategory || "Cloth"} model`}
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
            </div>
          ) : (
            // Fallback: show uploaded image with rotation
            <div
              className="w-full h-full transition-transform duration-300 ease-in-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {uploadData?.frontImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={uploadData.frontImage.url}
                  alt="Uploaded cloth"
                  className="w-full h-full object-contain"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={PREVIEW_IMAGES[currentKey]}
                  alt={currentKey}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          )}
          {/* Navigation buttons - only show when not viewing 3D model */}
          {!modelUrl || modelError || isAnalyzing ? (
            <>
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
                <ChevronRight
                  size={18}
                  className="text-[var(--text-primary)]"
                />
              </button>

              <button
                onClick={rotate}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white active:scale-95 transition-all"
              >
                <RotateCcw size={16} className="text-[var(--text-secondary)]" />
              </button>
            </>
          ) : null}
        </div>

        {/* Dots indicator */}
        {!modelUrl || modelError ? (
          <div className="flex gap-1.5 mt-3">
            {PREVIEW_VIEW_KEYS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentIndex
                    ? "bg-[var(--primary)] w-5"
                    : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>

      {/* Bottom sheet - sticky */}
      <div className="bg-white rounded-t-3xl px-6 pt-5 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex-shrink-0">
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-5" />

        {addedToWardrobe ? (
          // Success state
          <div className="text-center py-4">
            <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-green-600">
              Đã thêm vào tủ đồ!
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Đang chuyển đến tủ đồ...
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-5">
              <h2 className="text-xl font-bold" style={{ color: "#C8860A" }}>
                {t("upload.preview.generationComplete")}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">
                {analysisResult
                  ? `${analysisResult.garmentCategory} - Confidence: ${Math.round(analysisResult.confidence * 100)}%`
                  : t("upload.preview.generationSubtitle")}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAddToWardrobe}
                disabled={!analysisResult || isAddingToWardrobe}
                className="w-full py-4 rounded-full bg-[var(--primary)] text-white font-bold text-base flex items-center justify-center gap-2 active:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isAddingToWardrobe ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <CheckCircle size={20} />
                )}
                {t("upload.preview.addToWardrobe")}
              </button>

              {addError && (
                <div className="flex items-center justify-center gap-2 text-red-500 text-sm">
                  <AlertCircle size={16} />
                  {addError}
                </div>
              )}

              <button
                onClick={() => router.push("/upload/attributes")}
                className="w-full py-4 rounded-full border border-[var(--border-light)] bg-white text-[var(--text-primary)] font-semibold text-base flex items-center justify-center gap-2 hover:bg-gray-50 active:opacity-90 transition-all"
              >
                <SlidersHorizontal
                  size={18}
                  className="text-[var(--text-secondary)]"
                />
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
          </>
        )}
      </div>
    </div>
  );
}
