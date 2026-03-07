"use client";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Clock } from "lucide-react";

export default function AvatarSetupPage() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="flex flex-col h-[100dvh] bg-white relative overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4 relative z-10">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-start transition-colors"
        >
          <ChevronLeft className="text-[#0f172a] w-6 h-6" />
        </button>
        <h1 className="text-[18px] font-bold text-[#0f172a] tracking-[trim] tracking-[-0.27px] flex-1 text-center mr-10 leading-[22.5px]">
          {t("avatar.setup.title", "Avatar Setup")}
        </h1>
      </div>

      {/* 3D Model Card */}
      <div className="px-8 mt-6 w-full flex justify-center">
        <div className="relative w-full max-w-[320px] aspect-[4/5] bg-gradient-to-b from-primary/10 to-transparent border border-primary/20 rounded-[24px] flex items-center justify-center overflow-hidden">
          {/* Decorative background circle/glow placeholder */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.3)_0%,transparent_70%)]" />

          <div className="relative w-full h-[76%] mt-[-10%] z-10">
            <Image
              src="/images/scan/1.png"
              alt="3D Avatar Preview"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Time Estimate Badge */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 backdrop-blur-[6px] bg-primary/20 border border-primary/30 rounded-full py-[7px] px-[17px] flex items-center gap-[8px]">
            <Clock className="w-4 h-4 text-primary" strokeWidth={2.5} />
            <span className="text-[12px] font-medium text-primary leading-[16px]">
              {t("avatar.setup.timeEstimate", "2-3 min estimate")}
            </span>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-8 mt-10 flex flex-col items-center text-center">
        <h2 className="text-[30px] leading-[37.5px] font-bold text-[#334155] mb-5 tracking-[-0.75px]">
          {t("avatar.setup.heading", "Create Your 3D Body\nAvatar").split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h2>

        <p className="text-[16px] leading-[26px] text-[#94a3b8] mb-10 px-2 font-normal">
          {t("avatar.setup.subtitle", "Personalize your shopping experience\nand see outfits on your real body shape\nbefore you buy.").split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </p>
      </div>

      {/* Floating Button */}
      <div className="absolute bottom-10 left-6 right-6 z-20 flex justify-center">
        <button
          onClick={() => router.push("/avatar/measurements")}
          className="w-full max-w-[342px] py-[16px] flex items-center justify-center text-[16px] font-bold text-white bg-primary rounded-full shadow-[0_10px_15px_-3px_rgba(var(--primary-rgb),0.2),0_4px_6px_-4px_rgba(var(--primary-rgb),0.2)] active:scale-95 transition-all"
        >
          {t("avatar.setup.getStarted", "Get Started")}
        </button>
      </div>
    </div>
  );
}
