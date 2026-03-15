"use client";

import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import {
  ChevronLeft,
  ImagePlus,
  Lightbulb,
  Sparkles,
  User,
} from "lucide-react";
import { avatarApi } from "@/lib/api/avatar";
import type {
  BodyGenerationResult,
  GenerateAvatarRequest,
} from "@/lib/types/avatar";

// Store key for passing data between pages
const MEASUREMENTS_KEY = "outfy_measurements";
const AVATAR_RESULT_KEY = "outfy_avatar_result";

function AvatarScanContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep =
    searchParams?.get("step") === "processing" ? "processing" : "camera";
  const [step, setStep] = useState<"camera" | "processing">(initialStep);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Load measurements from localStorage and call API
  const callGenerateAvatarAPI = async () => {
    try {
      setError(null);
      const storedData = localStorage.getItem(MEASUREMENTS_KEY);
      if (!storedData) {
        // No measurements data, go to result with placeholder
        router.push("/avatar/result");
        return;
      }

      const measurements = JSON.parse(storedData);

      // Convert to API request format
      const request: GenerateAvatarRequest = {
        gender: measurements.gender || "female",
        heightCm: measurements.height,
        weightKg: measurements.weight,
        chestCm: measurements.chest,
        waistCm: measurements.waist,
        hipCm: measurements.hips,
        shoulderCm: measurements.shoulder || 38, // Default if not provided
        inseamCm: measurements.inseam || 75, // Default if not provided
      };

      const response = await avatarApi.generateAvatar(request);
      // avatarApi.generateAvatar already returns unwrapped data
      const result: BodyGenerationResult = response;

      // Save result to localStorage for result page
      localStorage.setItem(AVATAR_RESULT_KEY, JSON.stringify(result));

      // Navigate to result after processing completes
      router.push("/avatar/result");
    } catch (err) {
      console.error("Failed to generate avatar:", err);
      setError("Failed to generate avatar. Please try again.");
      // Still navigate to result page (will show placeholder)
      setTimeout(() => router.push("/avatar/result"), 1500);
    }
  };

  useEffect(() => {
    if (step === "processing") {
      // Start progress animation
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          const inc = Math.floor(Math.random() * 5) + 1;
          return Math.min(100, p + inc);
        });
      }, 150);

      // Call API after a short delay to show processing animation
      const apiTimeout = setTimeout(() => {
        callGenerateAvatarAPI();
      }, 1000);

      return () => {
        clearInterval(interval);
        clearTimeout(apiTimeout);
      };
    }
  }, [step]);

  // View for Camera Step (iPhone 17 - 17)
  if (step === "camera") {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#FAFAFA] relative overflow-hidden font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-12 pb-4 z-20">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-start"
          >
            <ChevronLeft className="w-6 h-6 text-[#0f172a]" />
          </button>
          <span className="text-[16px] font-bold text-[#0f172a] tracking-[-0.4px] flex-1 text-center py-2">
            {t("avatar.scan.scanTitle", "SCAN")}
          </span>
          <button
            onClick={() => router.push("/avatar/measurements")}
            className="w-auto text-right font-bold text-primary uppercase text-[14px] tracking-[1.4px] shrink-0"
          >
            {t("avatar.scan.skip", "Skip")}
          </button>
        </div>

        {/* Camera HUD Box */}
        <div className="absolute left-6 right-6 top-[12vh] bottom-[20vh] rounded-[32px] border border-primary bg-slate-500/10 flex flex-col items-center justify-center shadow-sm overflow-hidden">
          {/* Yellow Corner Markers */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-[2px] border-l-[2px] border-secondary/60" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-[2px] border-r-[2px] border-secondary/60" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-[2px] border-l-[2px] border-secondary/60" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-[2px] border-r-[2px] border-secondary/60" />

          {/* Interactive touch area for scanning */}
          <button
            className="absolute inset-0 z-10 w-full h-full cursor-pointer outline-none"
            onClick={() => router.push("/avatar/measurements")}
          />

          {/* Dashed body outline wrapper */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-[192px] h-[320px] border-[2px] border-dashed border-secondary/40 rounded-[9999px] flex items-center justify-center relative overflow-hidden">
              <User
                className="w-[85px] h-[85px] text-secondary/60"
                strokeWidth={1.5}
              />

              <style jsx>{`
                @keyframes scan-vertical {
                  0% {
                    top: -20%;
                    opacity: 0;
                  }
                  20% {
                    opacity: 1;
                  }
                  80% {
                    opacity: 1;
                  }
                  100% {
                    top: 100%;
                    opacity: 0;
                  }
                }
                .animate-scan-vertical {
                  animation: scan-vertical 2.5s ease-in-out infinite;
                }
              `}</style>
              <div className="animate-scan-vertical absolute top-0 left-0 right-0 h-16 bg-linear-to-b from-transparent via-secondary/20 to-transparent shadow-[0_0_15px_rgba(var(--secondary-rgb),0.5)] z-10" />
            </div>

            <div className="mt-4 bg-gray-200 px-[12px] py-[4px] rounded-full pointer-events-none z-20 backdrop-blur-[2px]">
              <span className="text-secondary font-medium text-[12px] tracking-[2.4px] uppercase">
                {t("avatar.scan.alignBody", "Align Body")}
              </span>
            </div>
          </div>

          {/* Level Indicator (Right edge middle) */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[4px] h-[128px] bg-white/20 rounded-full overflow-hidden pointer-events-none">
            <div className="w-full h-[8px] bg-secondary absolute top-1/2 -translate-y-1/2 shadow-[0_0_8px_var(--secondary)]" />
          </div>

          {/* Side Icons */}
          <div className="absolute bottom-20 left-6 flex flex-col gap-3 pointer-events-auto z-20">
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <ImagePlus className="w-6 h-6 text-slate-800" />
            </button>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Lightbulb className="w-6 h-6 text-slate-800" />
            </button>
          </div>
        </div>

        {/* Instructions at bottom */}
        <div className="absolute bottom-12 left-[30px] right-[30px] flex justify-between items-end">
          <div className="flex flex-col w-[260px]">
            <h3 className="text-[18px] font-bold text-[#0f172a] leading-[28px]">
              {t("avatar.scan.step1Title", "Stand straight")}
            </h3>
            <p className="text-[14px] text-[#94a3b8] leading-[20px] font-normal">
              {t("avatar.scan.step1Desc", "Keep arms slightly away from body")}
            </p>
          </div>
          <div className="flex flex-col items-end gap-[4px]">
            <span className="text-secondary font-bold text-[14px] leading-[20px]">
              1 / 4
            </span>
            <div className="flex gap-[4px]">
              <div className="w-[16px] h-[4px] rounded-full bg-secondary" />
              <div className="w-[16px] h-[4px] rounded-full bg-slate-300/50" />
              <div className="w-[16px] h-[4px] rounded-full bg-slate-300/50" />
              <div className="w-[16px] h-[4px] rounded-full bg-slate-300/50" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // View for Processing Step (iPhone 17 - 18)
  if (step === "processing") {
    return (
      <div className="flex flex-col h-[100dvh] bg-white relative overflow-hidden font-sans">
        {/* Decorative Blurred Background Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-primary/5 blur-[60px] pointer-events-none" />

        <div className="flex items-center justify-between px-6 pt-12 pb-4 z-20">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-start"
          >
            <ChevronLeft className="w-6 h-6 text-[#0f172a]" />
          </button>
          <span className="text-[18px] font-bold text-[#0f172a] flex-1 text-center mr-10 py-2 tracking-[-0.45px]">
            {t("avatar.scan.title", "Creating Avatar")}
          </span>
        </div>

        {/* Center UI Card */}
        <div className="mt-[10vh] mx-auto w-[85%] max-w-[320px] h-[256px] rounded-[40px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.05)] border border-[#f1f5f9] bg-white flex items-center justify-center relative overflow-hidden">
          <div className="absolute left-[24px] top-[32px] text-[9px] font-['Liberation_Mono',_monospace] font-bold text-[#94a3b8] uppercase leading-[13.5px] tracking-[0.9px] z-10">
            VERTEX CALC: ACTIVE
            <br />
            NODES: 14,802
          </div>

          <div className="absolute bottom-[24px] right-[24px] text-[9px] font-['Liberation_Mono',_monospace] font-bold text-[#94a3b8] uppercase leading-[13.5px] tracking-[0.9px] text-right z-10">
            ENGINE V2.4
            <br />
            PERSONALIZING...
          </div>

          {/* Inner Rounded Frame Area */}
          <div className="absolute inset-4 rounded-[32px] overflow-hidden flex items-center justify-center">
            {/* Faint User Silhouette */}
            <User
              className="w-[150px] h-[150px] text-slate-200"
              strokeWidth={1}
            />

            {/* Inner border line dividing horizontally */}
            <div className="absolute top-[35%] w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            {/* Blue Scanner Line Gradient Overlay Area */}
            <div
              className="absolute left-0 right-0 h-[60px] bg-gradient-to-b from-primary/5 via-primary/10 to-transparent transition-all ease-linear z-20 pointer-events-none"
              style={{ top: `${progress - 20}%` }}
            />
            <div
              className="absolute left-0 right-0 h-[2px] shadow-[0_0_15px_color-mix(in_srgb,var(--primary)_80%,transparent)] bg-primary/80 transition-all ease-linear z-20"
              style={{ top: `${progress}%` }}
            />
          </div>
        </div>

        {/* Loading Progress section */}
        <div className="absolute bottom-[8vh] left-[30px] right-[30px]">
          <div className="flex justify-between items-end mb-[20px]">
            <div className="flex flex-col gap-[4px] w-full pr-4">
              <h3 className="text-[20px] font-bold text-[#0f172a] tracking-[-0.5px] leading-[20px]">
                {t("avatar.scan.processingTitle", "Processing images...")}
              </h3>
              <p className="text-[14px] font-medium text-[#64748b] leading-[20px]">
                {t(
                  "avatar.scan.processingDesc",
                  "AI is analyzing your body measurements",
                )}
              </p>
            </div>
            <span className="text-[24px] font-bold text-secondary leading-[24px] tracking-tight shrink-0">
              {progress}%
            </span>
          </div>

          <div className="w-full h-[16px] bg-[#f1f5f9] rounded-full overflow-hidden mb-[20px] shadow-[inset_0px_2px_4px_rgba(0,0,0,0.05)] relative">
            <div
              className="absolute top-[3px] bottom-[3px] left-[3px] bg-gradient-to-r from-primary/80 to-primary transition-all duration-300 rounded-full"
              style={{ width: `calc(${progress}% - 6px)` }}
            />
          </div>

          <div className="bg-white/50 backdrop-blur-md border border-[#f1f5f9] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.05)] py-[9px] px-[17px] rounded-[16px] flex items-center justify-start gap-[12px] w-full">
            <Sparkles className="w-[16.5px] h-[16.5px] text-primary animate-pulse shrink-0" />
            <span className="text-[12px] font-bold text-[#475569] tracking-[1.2px] uppercase">
              {t("avatar.scan.generatingMesh", "Generating high-fidelity mesh")}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default function AvatarScanPage() {
  return (
    <Suspense fallback={<div className="bg-[#FAFAFA] h-dvh" />}>
      <AvatarScanContent />
    </Suspense>
  );
}
