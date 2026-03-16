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
import type { BodyGenerationResult } from "@/lib/types/avatar";

// API Base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const SNAP_HEIGHTS = ["15vh", "55vh", "85vh"];

const CATEGORIES = ["Tops", "Bottoms", "Shoes", "Outfits"];

// Key for avatar result in localStorage
const AVATAR_RESULT_KEY = "outfy_avatar_result";

// Mock data for clothing items (would come from upload or other source)
const MOCK_CLOTHING_ITEMS = [
  {
    id: "1",
    name: "Gray Hoodie",
    imageUrl: "/images/items/item1.png",
    category: "tops",
    modelUrl: "/models/cloth/hoodie.glb",
  },
  {
    id: "2",
    name: "Khaki Shorts",
    imageUrl: "/images/items/item2.png",
    category: "bottoms",
    modelUrl: "/models/cloth/shorts.glb",
  },
];

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
        <Link href="/upload">
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
                      src={selectedModel.imageUrl}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Try now button */}
      <AnimatePresence>
        {selectedItems.length === 2 && !tried && activeCategory !== 3 && (
          <motion.div
            className="absolute inset-x-0 z-10 flex justify-center"
            style={{ bottom: "calc(15vh + 24px)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            <button
              onClick={() => setTried(true)}
              className="rounded-full px-8 py-3 text-sm font-bold text-white"
              style={{
                background: "var(--primary)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              }}
            >
              ✨ Thử ngay
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
            <AnimatePresence>
              {MOCK_CLOTHING_ITEMS.map((item, i) => (
                <motion.div
                  key={item.id}
                  onClick={() => {
                    setSelectedItems((prev) =>
                      prev.includes(item.id)
                        ? prev.filter((id) => id !== item.id)
                        : [...prev, item.id],
                    );
                    setTried(false);
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
                      border: selectedItems.includes(item.id)
                        ? "2px solid var(--primary)"
                        : "none",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                    {selectedItems.includes(item.id) && (
                      <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-(--primary)">
                        <Check size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[10px]",
                      selectedItems.includes(item.id)
                        ? "font-bold text-[var(--text-primary)]"
                        : "font-medium text-[var(--text-secondary)]",
                    )}
                  >
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add more button */}
            <Link href="/upload" className="flex flex-col items-center gap-2">
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
