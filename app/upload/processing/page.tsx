"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Clock, Shirt } from "lucide-react";

export default function ProcessingPage() {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const router = useRouter();
  const { t } = useTranslation();

  const statusKeys = ["status1", "status2", "status3", "status4"] as const;
  const secondsRemaining = Math.max(0, Math.round(((100 - progress) / 100) * 22));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => router.push("/upload/preview"), 600);
          return 100;
        }
        setStatusIndex(Math.min(Math.floor(next / 26), statusKeys.length - 1));
        return next;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [router, statusKeys.length]);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      {/* Back button */}
      <div className="px-4 pt-6">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100">
          <ArrowLeft size={20} className="text-[var(--text-primary)]" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-16 gap-8">
        {/* Mesh visual card */}
        <div className="w-full max-w-sm rounded-3xl bg-white shadow-lg overflow-hidden">
          <div
            className="flex flex-col items-center justify-center py-20 gap-5"
            style={{
              background:
                "radial-gradient(circle at 50% 55%, rgba(48,123,117,0.18) 0%, rgba(48,123,117,0.06) 55%, #f8fffe 100%)",
            }}
          >
            <div className="w-28 h-28 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
              <Shirt size={56} className="text-[var(--primary)]" strokeWidth={1.5} />
            </div>
            <span className="text-sm font-bold tracking-[0.2em] text-[var(--primary)] uppercase">
              {t("upload.processing.constructingMesh")}
            </span>
          </div>
        </div>

        {/* Progress info */}
        <div className="w-full max-w-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-[var(--text-primary)]">
              {t("upload.processing.generating")}
            </span>
            <span className="text-base font-bold text-[var(--secondary)]">{progress}%</span>
          </div>

          <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--primary)] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-[var(--text-tertiary)]" />
            <span className="text-xs text-[var(--text-tertiary)]">
              {t("upload.processing.approxRemaining", { seconds: secondsRemaining })}
            </span>
            <span className="ml-auto w-2 h-2 rounded-full bg-[var(--secondary)] animate-pulse" />
          </div>

          <p className="text-xs text-center text-[var(--text-tertiary)] italic pt-1">
            {t(`upload.processing.${statusKeys[statusIndex]}`)}
          </p>
        </div>
      </div>
    </div>
  );
}
