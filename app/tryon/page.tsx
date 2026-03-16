"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Shirt, Check, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  AvatarId,
  Size,
  FitType,
  AVATAR_OPTIONS,
  SIZE_OPTIONS,
  FIT_TYPE_OPTIONS,
  CreateTryOnFromWardrobeRequest,
  TryOnSession,
} from "@/lib/types/tryon";
import { createTryOnFromWardrobe, generateTryOnResult } from "@/lib/api/tryon";
import { getUserWardrobe } from "@/lib/api/cloth";
import { WardrobeItem } from "@/lib/types/cloth";

const TRYON_SESSION_KEY = "outfy_tryon_session";

export default function TryOnPage() {
  const router = useRouter();
  const { t } = useTranslation();

  // Form state
  const [userId, setUserId] = useState<string>("");
  const [wardrobeItemId, setWardrobeItemId] = useState<string>("");
  const [avatarId, setAvatarId] = useState<AvatarId | "">("");
  const [size, setSize] = useState<Size | "">("");
  const [fitType, setFitType] = useState<FitType | "">("");

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>([]);
  const [isLoadingWardrobe, setIsLoadingWardrobe] = useState(true);
  const [error, setError] = useState<string>("");

  // Dropdown states
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [showFitTypeDropdown, setShowFitTypeDropdown] = useState(false);
  const [showWardrobeDropdown, setShowWardrobeDropdown] = useState(false);

  // Load wardrobe items
  useEffect(() => {
    const loadWardrobe = async () => {
      if (!userId) {
        setIsLoadingWardrobe(false);
        return;
      }
      try {
        const items = await getUserWardrobe(parseInt(userId));
        setWardrobeItems(items || []);
      } catch (err) {
        console.error("Failed to load wardrobe:", err);
        setWardrobeItems([]);
      } finally {
        setIsLoadingWardrobe(false);
      }
    };
    loadWardrobe();
  }, [userId]);

  // Handle create try-on session
  const handleStartTryOn = async () => {
    if (!userId || !wardrobeItemId || !avatarId) {
      setError(t("common.requiredField", "Please fill in all required fields"));
      return;
    }

    setError("");
    setIsCreating(true);

    try {
      // Create try-on session
      const request: CreateTryOnFromWardrobeRequest = {
        userId: parseInt(userId),
        wardrobeItemId: parseInt(wardrobeItemId),
        avatarId,
        size: size || undefined,
        fitType: fitType || undefined,
      };

      const session: TryOnSession = await createTryOnFromWardrobe(request);

      // Save session to localStorage
      localStorage.setItem(TRYON_SESSION_KEY, JSON.stringify(session));

      // Generate try-on result
      setIsLoading(true);
      const result = await generateTryOnResult(session.id);

      // Save result and navigate
      localStorage.setItem("outfy_tryon_result", JSON.stringify(result));
      router.push("/tryon/result");
    } catch (err: unknown) {
      console.error("Try-on failed:", err);
      setError(
        t("tryon.errors.generateFailed", "Failed to create try-on session"),
      );
    } finally {
      setIsCreating(false);
      setIsLoading(false);
    }
  };

  const selectedWardrobeItem = wardrobeItems.find(
    (item) => item.id.toString() === wardrobeItemId,
  );

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
          {t("tryon.create.title")}
        </h1>
        <div className="w-9" />
      </div>

      <div className="flex-1 px-4 pb-8 overflow-y-auto">
        {/* User ID Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            User ID <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your user ID"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--primary)] focus:outline-none"
          />
        </div>

        {/* Wardrobe Item Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            {t("tryon.create.selectClothing")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowWardrobeDropdown(!showWardrobeDropdown)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white flex items-center justify-between"
            >
              <span
                className={
                  wardrobeItemId
                    ? "text-[var(--text-primary)]"
                    : "text-gray-400"
                }
              >
                {selectedWardrobeItem?.name || t("tryon.create.selectClothing")}
              </span>
              <ChevronDown size={20} className="text-gray-400" />
            </button>

            {showWardrobeDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-xl border border-gray-200 shadow-lg max-h-60 overflow-y-auto">
                {isLoadingWardrobe ? (
                  <div className="p-4 text-center text-gray-500">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                    Loading...
                  </div>
                ) : wardrobeItems.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    {t("tryon.create.noWardrobeItems")}
                  </div>
                ) : (
                  wardrobeItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setWardrobeItemId(item.id.toString());
                        setShowWardrobeDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                    >
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.garmentCategory}
                        </p>
                      </div>
                      {wardrobeItemId === item.id.toString() && (
                        <Check
                          size={18}
                          className="ml-auto text-[var(--primary)]"
                        />
                      )}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Avatar Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            {t("tryon.create.selectAvatar")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowAvatarDropdown(!showAvatarDropdown)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white flex items-center justify-between"
            >
              <span
                className={
                  avatarId ? "text-[var(--text-primary)]" : "text-gray-400"
                }
              >
                {avatarId
                  ? t(`tryon.avatar.${avatarId}`)
                  : t("tryon.create.selectAvatar")}
              </span>
              <ChevronDown size={20} className="text-gray-400" />
            </button>

            {showAvatarDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-xl border border-gray-200 shadow-lg max-h-60 overflow-y-auto">
                {AVATAR_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setAvatarId(option.id);
                      setShowAvatarDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">
                        {t(`tryon.avatar.${option.id}`)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {option.description}
                      </p>
                    </div>
                    {avatarId === option.id && (
                      <Check
                        size={18}
                        className="ml-auto text-[var(--primary)]"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            {t("tryon.create.selectSize")}
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSizeDropdown(!showSizeDropdown)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white flex items-center justify-between"
            >
              <span
                className={
                  size ? "text-[var(--text-primary)]" : "text-gray-400"
                }
              >
                {size ? t(`tryon.size.${size}`) : t("tryon.create.selectSize")}
              </span>
              <ChevronDown size={20} className="text-gray-400" />
            </button>

            {showSizeDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-xl border border-gray-200 shadow-lg">
                {SIZE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSize(option.value);
                      setShowSizeDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span className="text-[var(--text-primary)]">
                      {option.label}
                    </span>
                    {size === option.value && (
                      <Check size={18} className="text-[var(--primary)]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Fit Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
            {t("tryon.create.selectFitType")}
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFitTypeDropdown(!showFitTypeDropdown)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white flex items-center justify-between"
            >
              <span
                className={
                  fitType ? "text-[var(--text-primary)]" : "text-gray-400"
                }
              >
                {fitType
                  ? t(`tryon.fitType.${fitType}`)
                  : t("tryon.create.selectFitType")}
              </span>
              <ChevronDown size={20} className="text-gray-400" />
            </button>

            {showFitTypeDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-xl border border-gray-200 shadow-lg">
                {FIT_TYPE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setFitType(option.value);
                      setShowFitTypeDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span className="text-[var(--text-primary)]">
                      {option.label}
                    </span>
                    {fitType === option.value && (
                      <Check size={18} className="text-[var(--primary)]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Start Button */}
        <button
          onClick={handleStartTryOn}
          disabled={
            isCreating || isLoading || !userId || !wardrobeItemId || !avatarId
          }
          className="w-full py-4 bg-[var(--primary)] text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating || isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {isCreating
                ? t("tryon.create.creating")
                : t("tryon.result.processing")}
            </>
          ) : (
            <>
              <Shirt size={20} />
              {t("tryon.create.startTryOn")}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
