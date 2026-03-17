"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Plus,
  Share2,
  Star,
  ListFilter,
  Shirt,
  ChevronDown,
  ArrowLeftRight,
  Trash2,
  Check,
  HelpCircle,
  RotateCw,
  X,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import api from "@/lib/api";
import { quickTryOn } from "@/lib/api/tryon";
import type { BodyGenerationResult } from "@/lib/types/avatar";
import type { QuickTryOnResponse } from "@/lib/types/tryon";

// API Base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const SNAP_HEIGHTS = ["15vh", "55vh", "85vh"];

const CATEGORIES = ["Tops", "Bottoms", "Shoes", "Outfits"];

// Key for avatar result in localStorage
const AVATAR_RESULT_KEY = "outfy_avatar_result";

// Types for API response
interface WardrobeItem {
  id: number;
  userId: number;
  clothingItemId: number;
  category: string;
  season: string;
  color: string | null;
  isFavorite: boolean;
  notes: string | null;
  imageUrl: string;
  templateCode: string;
  modelUrl: string;
  previewUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface WardrobeApiResponse {
  success: boolean;
  message: string | null;
  data: WardrobeItem[];
}

// Grouped clothing by category (unique)
interface CategoryGroup {
  category: string;
  item: WardrobeItem;
}

function FloatingActionBtn({
  icon: Icon,
  bg,
  iconColor = "white",
  size = 40,
  onClick,
}: {
  icon: React.ElementType;
  bg: string;
  iconColor?: string;
  size?: number;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: size,
        height: size,
        background: bg,
        boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
      }}
      className="flex items-center justify-center rounded-full transition-opacity hover:opacity-90"
    >
      <Icon size={size * 0.45} color={iconColor} />
    </button>
  );
}

export default function WardrobePage() {
  const [snapIndex, setSnapIndex] = useState(1);
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [tried, setTried] = useState(false);

  // Quick Try-On state
  const [isQuickTryingOn, setIsQuickTryingOn] = useState(false);
  const [quickTryOnResult, setQuickTryOnResult] =
    useState<QuickTryOnResponse | null>(null);

  // Wardrobe data from API
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>([]);
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Cache for converted blob URLs to Base64
  const [imageUrlCache, setImageUrlCache] = useState<Record<string, string>>(
    {},
  );

  // Fetch wardrobe data from API
  useEffect(() => {
    const fetchWardrobeData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get userId from localStorage or use default
        const userId = 1; // TODO: Get from auth store

        const response = await api.get<WardrobeApiResponse>(
          `/wardrobe/user/${userId}`,
        );

        // api interceptor returns response.data directly
        const data = response as unknown as WardrobeApiResponse;

        if (data.success && data.data) {
          setWardrobeItems(data.data);

          // Group by category and get unique categories (first item of each category)
          const grouped: CategoryGroup[] = data.data.reduce(
            (acc: CategoryGroup[], item: WardrobeItem) => {
              const existingCategory = acc.find(
                (g) => g.category === item.category,
              );
              if (!existingCategory) {
                acc.push({ category: item.category, item });
              }
              return acc;
            },
            [],
          );

          setCategoryGroups(grouped);
        }
      } catch (err) {
        console.error("Failed to fetch wardrobe data:", err);
        setError("Failed to load wardrobe data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWardrobeData();
  }, []);

  // Convert blob URLs to Base64 when wardrobe items are loaded
  useEffect(() => {
    const convertBlobUrls = async () => {
      const newCache: Record<string, string> = {};
      const items = [...wardrobeItems];

      for (const item of items) {
        // Check imageUrl
        if (
          item.imageUrl.startsWith("blob:") &&
          !imageUrlCache[item.imageUrl]
        ) {
          try {
            const response = await fetch(item.imageUrl);
            if (!response.ok) {
              console.warn("Failed to fetch blob URL:", item.imageUrl);
              continue;
            }
            const blob = await response.blob();
            const base64 = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
            });
            newCache[item.imageUrl] = base64;
          } catch (err) {
            console.warn("Failed to convert blob URL:", item.imageUrl, err);
          }
        }

        // Check previewUrl
        if (
          item.previewUrl?.startsWith("blob:") &&
          !imageUrlCache[item.previewUrl]
        ) {
          try {
            const response = await fetch(item.previewUrl);
            if (!response.ok) {
              console.warn("Failed to fetch blob URL:", item.previewUrl);
              continue;
            }
            const blob = await response.blob();
            const base64 = await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
            });
            newCache[item.previewUrl] = base64;
          } catch (err) {
            console.warn("Failed to convert blob URL:", item.previewUrl, err);
          }
        }
      }

      if (Object.keys(newCache).length > 0) {
        setImageUrlCache((prev) => ({ ...prev, ...newCache }));
      }
    };

    if (wardrobeItems.length > 0) {
      convertBlobUrls();
    }
  }, [wardrobeItems]);

  // Get image URL - returns cached Base64 if available, otherwise normal URL
  const getCachedImageUrl = (url: string) => {
    if (!url) return "/images/placeholder.png"; // Default placeholder

    // Check if it's a blob URL that has failed (not in cache)
    if (url.startsWith("blob:") && !imageUrlCache[url]) {
      // Blob URL expired - return placeholder
      return "/images/placeholder.png";
    }

    // Return cached Base64 if available
    if (imageUrlCache[url]) {
      return imageUrlCache[url];
    }

    // Otherwise use normal URL handler
    return getFullImageUrl(url);
  };

  // Map category to tab index
  const getCategoryIndex = (category: string): number => {
    const categoryMap: Record<string, number> = {
      TOPS: 0,
      BOTTOMS: 1,
      SHOES: 2,
      OUTFITS: 3,
    };
    return categoryMap[category.toUpperCase()] ?? 0;
  };

  // Avatar 3D Model state (from localStorage)
  const [avatarModel, setAvatarModel] = useState<{
    modelUrl: string;
    previewUrl: string;
    bodyType: string;
  } | null>(null);

  // 3D Viewer state
  const [selectedModel, setSelectedModel] = useState<{
    title: string;
    modelUrl: string;
    imageUrl: string;
  } | null>(null);
  const [modelError, setModelError] = useState(false);

  // Load avatar model from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem(AVATAR_RESULT_KEY);
    if (storedData && storedData !== "undefined" && storedData !== "null") {
      try {
        const result: BodyGenerationResult = JSON.parse(storedData);
        if (result && (result.modelUrl || result.previewUrl)) {
          setAvatarModel({
            modelUrl: result.modelUrl,
            previewUrl: result.previewUrl,
            bodyType: result.bodyType,
          });
        }
      } catch (e) {
        console.error("Failed to parse avatar result:", e);
      }
    }
  }, []);

  const handleSheetDragEnd = (
    _: unknown,
    info: { offset: { y: number }; velocity: { y: number } },
  ) => {
    if (info.offset.y < -50 || info.velocity.y < -300) {
      setSnapIndex((s) => Math.min(s + 1, 2));
    } else if (info.offset.y > 50 || info.velocity.y > 300) {
      setSnapIndex((s) => Math.max(s - 1, 0));
    }
  };

  // Full model URL for model-viewer
  const fullModelUrl = selectedModel?.modelUrl
    ? `${API_BASE_URL.replace("/api/v1", "")}${selectedModel.modelUrl}`
    : null;

  // Full image URL - handle both relative and absolute URLs
  const getFullImageUrl = (url: string) => {
    if (!url) return "";

    // Already a valid absolute URL
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    // Relative URL - prepend API base URL
    return `${API_BASE_URL.replace("/api/v1", "")}${url}`;
  };

  // Avatar full model URL
  const avatarFullModelUrl = avatarModel?.modelUrl
    ? `${API_BASE_URL.replace("/api/v1", "")}${avatarModel.modelUrl}`
    : null;

  // Handler to view avatar in 3D
  const handleViewAvatar3D = () => {
    if (avatarModel) {
      setSelectedModel({
        title: `Avatar - ${avatarModel.bodyType || "My Avatar"}`,
        modelUrl: avatarModel.modelUrl,
        imageUrl: avatarModel.previewUrl,
      });
      setModelError(false);
    }
  };

  // Handler for Quick Try-On
  const handleQuickTryOn = async () => {
    if (selectedItems.length < 1) return;

    setIsQuickTryingOn(true);
    setError(null);

    try {
      // Get userId from localStorage or use default
      const userId = parseInt(localStorage.getItem("outfy_user_id") || "1", 10);

      // Get gender from measurements and bodyType from avatar result in localStorage
      const measurementsStr = localStorage.getItem("outfy_measurements");
      const avatarResultStr = localStorage.getItem(AVATAR_RESULT_KEY);
      let gender = "female";
      let bodyType = "regular";

      // Get gender from measurements (stored when creating avatar)
      if (measurementsStr) {
        const measurements = JSON.parse(measurementsStr);
        const genderFromMeasurements = measurements.gender?.toLowerCase() || "";
        if (genderFromMeasurements === "male") {
          gender = "male";
        } else if (genderFromMeasurements === "female") {
          gender = "female";
        }
      }

      // Get bodyType from avatar result
      if (avatarResultStr) {
        const avatarResult = JSON.parse(avatarResultStr);

        // Map body type from avatar result or preset code
        const bodyTypeFromResult = avatarResult.bodyType?.toLowerCase() || "";
        const presetCode = avatarResult.avatarPresetCode?.toUpperCase() || "";

        if (bodyTypeFromResult) {
          bodyType = bodyTypeFromResult;
        } else if (presetCode.includes("SLIM")) {
          bodyType = "slim";
        } else if (
          presetCode.includes("ATHLETIC") ||
          presetCode.includes("BROAD")
        ) {
          bodyType = "broad";
        } else if (presetCode.includes("CURVY")) {
          bodyType = "curvy";
        }
      }

      // Get wardrobeItemIds from selected items
      const wardrobeItemIds = selectedItems.map((id) => parseInt(id, 10));

      // Call Quick Try-On API
      const result = await quickTryOn({
        userId,
        gender,
        bodyType,
        wardrobeItemIds,
      });

      // Store result and show in model viewer
      setQuickTryOnResult(result);
      setTried(true);

      // Display the 3D model
      setSelectedModel({
        title: `Try-On: ${result.bodyType} - ${result.clothingCategories.join(", ")}`,
        modelUrl: result.modelUrl,
        imageUrl: "", // No preview image, show 3D model directly
      });
      setModelError(false);

      // Save to localStorage for persistence
      localStorage.setItem("outfy_quick_tryon_result", JSON.stringify(result));
    } catch (err) {
      console.error("Quick Try-On failed:", err);
      setError("Không thể thực hiện thử đồ nhanh. Vui lòng thử lại.");
      setTried(true); // Still show tried state even on error
    } finally {
      setIsQuickTryingOn(false);
    }
  };

  return (
    <div className="relative overflow-hidden userInput">
      {/* Avatar background - 3D Model or Static Image */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {avatarModel && avatarFullModelUrl && !modelError ? (
            // 3D Model Viewer - when avatar exists in localStorage
            <motion.div
              key="avatar-3d"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {/* @ts-expect-error model-viewer is a web component */}
              <model-viewer
                src={avatarFullModelUrl}
                alt="3D Avatar"
                auto-rotate
                camera-controls
                disable-zoom
                className="absolute inset-0 h-full w-full"
                style={{
                  background: "transparent",
                  ["--poster-color"]: "transparent",
                }}
                poster={avatarModel.previewUrl}
              />
            </motion.div>
          ) : tried ? (
            <motion.img
              key="3dfullv4"
              src="/images/3dfullv4.png"
              alt="3D Avatar V4"
              className="absolute inset-0 h-full w-full object-cover object-top"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4 }}
            />
          ) : snapIndex === 0 ? (
            <motion.img
              key="3dfull"
              src="/images/3dfullv1.png"
              alt="3D Avatar Full"
              className="absolute inset-0 h-full w-full object-cover object-top"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.img
              key="sumary3d"
              src="/images/sumary3d.png"
              alt="3D Avatar Summary"
              className="absolute inset-0 h-full w-full object-cover object-top"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Right-side floating actions */}
      <div className="absolute right-3 top-16 z-10 flex flex-col gap-4">
        <FloatingActionBtn icon={MessageCircle} bg="var(--primary)" size={48} />
        <Link href="/upload/category">
          <FloatingActionBtn icon={Plus} bg="var(--secondary)" />
        </Link>
        <Link href="/share-look">
          <FloatingActionBtn icon={Share2} bg="white" iconColor="#0f172a" />
        </Link>
        <FloatingActionBtn icon={Star} bg="white" iconColor="#0f172a" />
        <Link href="/ai-fit-analysis/result">
          <FloatingActionBtn icon={HelpCircle} bg="white" iconColor="#0f172a" />
        </Link>
        {/* View Avatar 3D Button - only show if avatar model exists */}
        {avatarModel && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleViewAvatar3D}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg"
            title="Xem Avatar 3D"
          >
            <RotateCw size={20} className="text-white" />
          </motion.button>
        )}
      </div>

      {/* 3D Model Viewer Modal */}
      <AnimatePresence>
        {selectedModel && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedModel(null);
                setModelError(false);
              }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-t from-slate-800 to-slate-900 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{ height: "65vh" }}
            >
              {/* Header */}
              <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-4 py-3">
                <button
                  onClick={() => {
                    setSelectedModel(null);
                    setModelError(false);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-md"
                >
                  <X size={16} className="text-white" />
                </button>
                <span className="text-sm font-medium text-white">
                  {selectedModel.title}
                </span>
                <div className="w-8" /> {/* Spacer for centering */}
              </div>

              {/* 3D Viewer */}
              <div className="h-full w-full">
                {!modelError && fullModelUrl ? (
                  <>
                    {/* @ts-expect-error model-viewer is a web component */}
                    <model-viewer
                      src={fullModelUrl}
                      alt={`3D Model - ${selectedModel.title}`}
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
                    {/* Rotate Icon */}
                    <div className="absolute right-4 bottom-4 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center pointer-events-none">
                      <RotateCw className="text-white/80 w-5 h-5" />
                    </div>
                  </>
                ) : (
                  // Fallback to image
                  <div className="flex h-full w-full items-center justify-center">
                    <img
                      src={getCachedImageUrl(selectedModel.imageUrl)}
                      alt={selectedModel.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-xs text-white/60">Kéo để xoay 360°</p>
              </div>

              {/* Quick Try-On Result Info Overlay */}
              {quickTryOnResult && (
                <div className="absolute left-4 right-4 bottom-16 bg-black/40 backdrop-blur-md rounded-2xl p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-white/60">Body Type</span>
                      <span className="text-sm font-semibold text-white capitalize">
                        {quickTryOnResult.bodyType}
                      </span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-xs text-white/60">Fit Score</span>
                      <span className="text-sm font-semibold text-green-400">
                        {Math.round(quickTryOnResult.fitScore * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">Trang phục</span>
                      <span className="text-xs font-medium text-white">
                        {quickTryOnResult.clothingCategories.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Try now button */}
      <AnimatePresence>
        {selectedItems.length >= 1 && !tried && activeCategory !== 3 && (
          <motion.div
            className="absolute inset-x-0 z-10 flex justify-center"
            style={{ bottom: "calc(15vh + 24px)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            <button
              onClick={handleQuickTryOn}
              disabled={isQuickTryingOn}
              className="rounded-full px-8 py-3 text-sm font-bold text-white disabled:opacity-50"
              style={{
                background: "var(--primary)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              }}
            >
              {isQuickTryingOn ? (
                <>
                  <Loader2 size={16} className="inline mr-2 animate-spin" />
                  Đang tải...
                </>
              ) : (
                "✨ Thử ngay"
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom-right swap/delete actions */}
      <div
        className="absolute right-5 z-10 flex flex-col gap-3"
        style={{ bottom: "130px" }}
      >
        <AnimatePresence>
          {activeCategory === 3 && selectedItems.length === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Link href="/outfit-duel">
                <FloatingActionBtn icon={ArrowLeftRight} bg="var(--primary)" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        <FloatingActionBtn icon={Trash2} bg="var(--primary)" />
      </div>

      {/* Draggable Bottom Sheet */}
      <motion.div
        className="absolute inset-x-0 bottom-0 overflow-hidden bg-white"
        style={{
          borderRadius: "40px 40px 0 0",
          boxShadow: "0 -10px 40px rgba(0,0,0,0.08)",
        }}
        animate={{ height: SNAP_HEIGHTS[snapIndex] }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.1, bottom: 0.1 }}
        onDragEnd={handleSheetDragEnd}
      >
        {/* Drag handle */}
        <div className="flex cursor-grab justify-center pb-2 pt-3">
          <div className="h-1.5 w-12 rounded-full bg-[#E2E8F0]" />
        </div>

        <div className="h-[calc(100%-32px)] overflow-y-auto">
          {/* Filter pills */}
          <div className="flex gap-2 overflow-x-auto px-6 pb-2">
            {/* Active filter chip */}
            <div
              className="flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold"
              style={{
                background:
                  "color-mix(in srgb, var(--primary) 10%, transparent)",
                borderColor:
                  "color-mix(in srgb, var(--primary) 20%, transparent)",
                color: "var(--primary)",
              }}
            >
              <ListFilter size={14} />
              Bộ lọc
              <ChevronDown size={12} />
            </div>
            <div className="flex flex-shrink-0 items-center gap-2 rounded-full border border-[var(--border-light)] bg-[var(--background)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)]">
              <Shirt size={14} />
              Cotton Tee
            </div>
            <div className="flex flex-shrink-0 items-center gap-2 rounded-full border border-[var(--border-light)] bg-[var(--background)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)]">
              Slim Jeans
            </div>
          </div>

          {/* Category tabs */}
          <div className="mt-4 px-6">
            <div className="flex border-b border-[var(--background)]">
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(i)}
                  className={cn(
                    "pb-3 mr-4 text-sm transition-colors",
                    i === activeCategory
                      ? "border-b-2 border-[var(--secondary)] font-bold text-[var(--secondary)]"
                      : "font-normal text-[var(--text-tertiary)]",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Clothing grid */}
          <div className="grid grid-cols-3 gap-3 px-6 pb-8 pt-6">
            {isLoading ? (
              <div className="col-span-3 flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-[var(--primary)]" />
              </div>
            ) : error ? (
              <div className="col-span-3 flex flex-col items-center justify-center gap-2 py-8">
                <p className="text-sm text-red-500">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-xs text-[var(--primary)] underline"
                >
                  Thử lại
                </button>
              </div>
            ) : (
              <AnimatePresence>
                {categoryGroups
                  .filter((group) => {
                    const catIndex = getCategoryIndex(group.category);
                    return catIndex === activeCategory;
                  })
                  .map((group, i) => {
                    const item = group.item;
                    return (
                      <motion.div
                        key={item.id}
                        onClick={() => {
                          // Set selected item for display
                          setSelectedItems((prev) =>
                            prev.includes(String(item.id))
                              ? prev.filter((id) => id !== String(item.id))
                              : [...prev, String(item.id)],
                          );
                          setTried(false);

                          // Open 3D model viewer
                          setSelectedModel({
                            title: item.templateCode || item.category,
                            modelUrl: item.modelUrl,
                            imageUrl: item.imageUrl,
                          });
                          setModelError(false);
                        }}
                        className="flex flex-col items-center gap-2 cursor-pointer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div
                          className="relative w-full overflow-hidden rounded-2xl bg-[#F1F5F9]"
                          style={{
                            aspectRatio: "0.75",
                            border: selectedItems.includes(String(item.id))
                              ? "2px solid var(--primary)"
                              : "none",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={getCachedImageUrl(item.imageUrl)}
                            alt={item.templateCode}
                            className="h-full w-full object-cover"
                          />
                          {selectedItems.includes(String(item.id)) && (
                            <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-(--primary)">
                              <Check size={10} className="text-white" />
                            </div>
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-[10px]",
                            selectedItems.includes(String(item.id))
                              ? "font-bold text-[var(--text-primary)]"
                              : "font-medium text-[var(--text-secondary)]",
                          )}
                        >
                          {item.templateCode || item.category}
                        </span>
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            )}

            {/* Add more button */}
            <Link
              href="/upload/category"
              className="flex flex-col items-center gap-2"
            >
              <div
                className="flex w-full items-center justify-center rounded-2xl border-2 border-[var(--border-light)] bg-[#F8FAFC]"
                style={{ aspectRatio: "0.75" }}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E2E8F0]">
                  <Plus size={14} className="text-[var(--text-tertiary)]" />
                </div>
              </div>
              <span className="text-[10px] font-medium text-[var(--text-tertiary)]">
                Thêm
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
