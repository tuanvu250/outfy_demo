"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Camera, ArrowLeft, Lightbulb, X } from "lucide-react";

interface UploadedImage {
  url: string;
  file: File;
}

// LocalStorage key for upload category
const UPLOAD_CATEGORY_KEY = "outfy_upload_category";

// Upload button component - defined outside main component
function UploadButton({
  image,
  onChange,
  onRemove,
  inputRef,
  label,
  isRequired,
}: {
  image: UploadedImage | null;
  onChange: (files: FileList | null) => void;
  onRemove: (e: React.MouseEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  label: string;
  isRequired?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-[var(--text-primary)]">
        {label}
      </span>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative rounded-2xl bg-gray-50 border border-[var(--border-light)] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden h-[200px]"
      >
        {image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.url}
              alt={label}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Remove button overlay */}
            <div
              onClick={onRemove}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shadow opacity-0 hover:opacity-100 transition-opacity"
            >
              <X size={12} className="text-white" />
            </div>
          </>
        ) : (
          <>
            {isRequired && (
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[var(--primary)] border border-[var(--primary)] rounded px-2 py-0.5 tracking-wider whitespace-nowrap">
                {isRequired ? "REQUIRED" : ""}
              </span>
            )}
            <Camera size={26} className="text-gray-400 mt-5" />
            <span className="text-xs text-gray-400">Tap to upload</span>
          </>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e.target.files)}
      />
    </div>
  );
}

export default function UploadPage() {
  const router = useRouter();
  const { t } = useTranslation();

  // Track front and back images separately
  const [frontImage, setFrontImage] = useState<UploadedImage | null>(null);
  const [backImage, setBackImage] = useState<UploadedImage | null>(null);

  // Get category from localStorage (set by category page)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);

  // Load category from localStorage on mount
  useEffect(() => {
    const category = localStorage.getItem(UPLOAD_CATEGORY_KEY);
    if (category) {
      setSelectedCategory(category);
    } else {
      // No category selected, redirect back to category page
      router.replace("/upload/category");
    }
  }, [router]);

  // Handle file selection for front image
  const handleFrontFile = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    setFrontImage({ url, file });
  }, []);

  // Handle file selection for back image
  const handleBackFile = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    setBackImage({ url, file });
  }, []);

  // Remove front image
  const removeFront = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFrontImage(null);
    if (frontRef.current) frontRef.current.value = "";
  };

  // Remove back image
  const removeBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBackImage(null);
    if (backRef.current) backRef.current.value = "";
  };

  // Handle continue - save images to localStorage and go to attributes
  const handleContinue = () => {
    if (!frontImage) return;

    // Save uploaded images to localStorage
    const uploadData = {
      category: selectedCategory,
      frontImage: frontImage,
      backImage: backImage,
    };
    localStorage.setItem("outfy_upload_data", JSON.stringify(uploadData));

    router.push("/upload/attributes");
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--background)] overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} className="text-[var(--text-primary)]" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-[var(--text-primary)] pr-8">
            {t("upload.pageTitle")}
          </h1>
        </div>

        {/* Selected Category Badge */}
        {selectedCategory && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs text-[var(--text-secondary)]">
              Đang upload:
            </span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full capitalize">
              {selectedCategory}
            </span>
          </div>
        )}

        {/* Add Garment Photos */}
        <div className="mb-5">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
            {t("upload.garmentPhotos")}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Front View */}
            <UploadButton
              image={frontImage}
              onChange={handleFrontFile}
              onRemove={removeFront}
              inputRef={frontRef}
              label={t("upload.frontView")}
              isRequired
            />

            {/* Back View */}
            <UploadButton
              image={backImage}
              onChange={handleBackFile}
              onRemove={removeBack}
              inputRef={backRef}
              label={t("upload.backView")}
            />
          </div>
        </div>

        {/* Pro Tip */}
        <div className="flex gap-3 rounded-2xl bg-orange-50 p-4">
          <Lightbulb
            size={18}
            className="text-[var(--secondary)] flex-shrink-0 mt-0.5"
          />
          <div>
            <span className="text-sm font-bold text-[var(--secondary)]">
              {t("upload.proTip")}
            </span>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
              {t("upload.proTipText")}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky bottom button */}
      <div className="px-4 pt-3 pb-6 bg-[var(--background)] border-t border-[var(--border-light)]">
        <button
          onClick={handleContinue}
          disabled={!frontImage}
          className="w-full py-4 rounded-full bg-[var(--primary)] text-white font-bold text-base flex items-center justify-center gap-2 disabled:opacity-40 active:opacity-90 transition-opacity"
        >
          {t("upload.continue")} <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
