"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Camera, Search, X, ArrowLeft, Lightbulb } from "lucide-react";

interface PreviewImage {
  id: number;
  url: string;
}

export default function UploadPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [previews, setPreviews] = useState<PreviewImage[]>([
    { id: 1, url: "/images/front.png" },
    { id: 2, url: "/images/back.png" },
  ]);
  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);
  const detailRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      setPreviews((prev) => [...prev, { id: Date.now() + Math.random(), url }]);
    });
  }, []);

  const removePreview = (id: number) => setPreviews((prev) => prev.filter((p) => p.id !== id));
  const removeAll = () => setPreviews([]);

  return (
    <div className="flex flex-col h-screen bg-[var(--background)] overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft size={20} className="text-[var(--text-primary)]" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-[var(--text-primary)] pr-8">
            {t("upload.pageTitle")}
          </h1>
        </div>

        {/* Add Garment Photos */}
        <div className="mb-5">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">{t("upload.garmentPhotos")}</h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Front View */}
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-[var(--text-primary)]">{t("upload.frontView")}</span>
              <button
                onClick={() => frontRef.current?.click()}
                className="relative rounded-2xl bg-gray-50 border border-[var(--border-light)] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
                style={{ height: 200 }}
              >
                <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[var(--primary)] border border-[var(--primary)] rounded px-2 py-0.5 tracking-wider whitespace-nowrap">
                  {t("upload.required")}
                </span>
                <Camera size={26} className="text-gray-400 mt-5" />
                <span className="text-xs text-gray-400">{t("upload.tapToUpload")}</span>
              </button>
              <input ref={frontRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
            </div>

            {/* Back View */}
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-[var(--text-primary)]">{t("upload.backView")}</span>
              <button
                onClick={() => backRef.current?.click()}
                className="rounded-2xl bg-gray-50 border border-[var(--border-light)] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
                style={{ height: 200 }}
              >
                <Camera size={26} className="text-gray-300" />
                <span className="text-xs text-gray-400">{t("upload.tapToUpload")}</span>
              </button>
              <input ref={backRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
            </div>
          </div>
        </div>

        {/* Details / Tags */}
        <div className="mb-5">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">{t("upload.detailsTags")}</h2>
          <button
            onClick={() => detailRef.current?.click()}
            className="w-full rounded-2xl bg-gray-50 border border-[var(--border-light)] flex flex-col items-center justify-center py-8 gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <Search size={22} className="text-gray-400" />
            <span className="text-sm text-gray-400">{t("upload.optional")}</span>
          </button>
          <input ref={detailRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        </div>

        {/* Uploaded Previews */}
        {previews.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-[var(--text-primary)]">{t("upload.uploadedPreviews")}</span>
              <button onClick={removeAll} className="text-sm font-semibold text-[var(--secondary)]">
                {t("upload.removeAll")}
              </button>
            </div>
            <div className="flex gap-3 flex-wrap">
              {previews.map((img, index) => (
                <div key={img.id} className="relative">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute bottom-1 left-1 text-[10px] font-bold text-white bg-black/60 rounded px-1 leading-4">
                    {index + 1}
                  </span>
                  <button
                    onClick={() => removePreview(img.id)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center shadow"
                  >
                    <X size={10} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pro Tip */}
        <div className="flex gap-3 rounded-2xl bg-orange-50 p-4">
          <Lightbulb size={18} className="text-[var(--secondary)] flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-sm font-bold text-[var(--secondary)]">{t("upload.proTip")}</span>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
              {t("upload.proTipText")}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky bottom button */}
      <div className="px-4 pt-3 pb-6 bg-[var(--background)] border-t border-[var(--border-light)]">
        <button
          onClick={() => router.push("/upload/category")}
          className="w-full py-4 rounded-full bg-[var(--primary)] text-white font-bold text-base flex items-center justify-center gap-2 active:opacity-90 transition-opacity"
        >
          {t("upload.continue")} <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}

