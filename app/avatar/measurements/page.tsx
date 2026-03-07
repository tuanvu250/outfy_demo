"use client";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MeasurementsFormData } from "@/lib/utils/validators";
import { ChevronLeft, ArrowRight, Activity, Scan, CircleDashed } from "lucide-react";

export default function MeasurementsPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const {
    register,
    handleSubmit,
  } = useForm<MeasurementsFormData>({});

  const onSubmit = () => {
    router.push("/avatar/scan?step=processing");
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-white relative font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4 shrink-0">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-start transition-colors"
        >
          <ChevronLeft className="text-[#0f172a] w-6 h-6" />
        </button>
        <h1 className="text-[18px] leading-[22.5px] font-bold text-[#0f172a] tracking-[-0.27px] flex-1 text-center mr-10">
          {t("avatar.measurements.title", "Enter Body Measurements")}
        </h1>
      </div>

      {/* Content wrapper with scrolling */}
      <div className="flex-1 overflow-y-auto pb-[100px] px-6">
        {/* Unit Toggle */}
        <div className="bg-[#F8FAFC] p-1 flex items-center justify-center rounded-full mb-8 border border-slate-100">
          <button
            type="button"
            onClick={() => setUnit("metric")}
            className={`flex-1 py-[10px] text-[13px] font-bold rounded-full transition-all ${unit === "metric" ? "bg-white text-primary shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)]" : "text-[#94a3b8] font-semibold"
              }`}
          >
            {t("avatar.measurements.unitMetric", "cm / kg")}
          </button>
          <button
            type="button"
            onClick={() => setUnit("imperial")}
            className={`flex-1 py-[10px] text-[13px] font-bold rounded-full transition-all ${unit === "imperial" ? "bg-white text-primary shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)]" : "text-[#94a3b8] font-semibold"
              }`}
          >
            {t("avatar.measurements.unitImperial", "inch / lbs")}
          </button>
        </div>

        <form id="measurements-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Visual Reference Section */}
          <div className="bg-secondary/10 rounded-[24px] p-4 flex gap-4 items-center">
            <div className="w-[62px] h-[116px] relative shrink-0">
              <Image src="/images/scan/2.png" alt="Visual Guide" fill className="object-contain" priority />
            </div>
            <div className="flex flex-col pr-2">
              <span className="text-secondary text-[10px] font-bold uppercase tracking-[1.5px] mb-0.5">
                {t("avatar.measurements.visualGuideTitle", "VISUAL GUIDE")}
              </span>
              <h3 className="text-slate-800 text-[14px] font-bold mb-1">
                {t("avatar.measurements.visualGuideSubtitle", "3D Body Avatar")}
              </h3>
              <p className="text-[#64748b] text-[11px] leading-relaxed font-medium">
                {t("avatar.measurements.visualGuideDesc", "Use a soft measuring tape for the most accurate sizing results.")}
              </p>
            </div>
          </div>

          {/* Vital Stats */}
          <div className="space-y-4 pt-2">
            <h4 className="text-[#64748B] text-[11px] font-bold tracking-[1.2px] uppercase">
              {t("avatar.measurements.vitalStats", "VITAL STATS")}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {/* Height */}
              <div className="bg-white border border-[#F1F5F9] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-[24px] p-4 pb-5 flex flex-col gap-1.5 focus-within:border-primary transition-colors">
                <label className="text-slate-400 text-[11px] font-medium">
                  {unit === "metric" ? t("avatar.measurements.heightCm", "Height (cm)") : t("avatar.measurements.heightIn", "Height (in)")}
                </label>
                <input
                  {...register("height", { valueAsNumber: true })}
                  type="number"
                  placeholder="175"
                  className="w-full text-slate-800 text-[20px] font-semibold outline-none bg-transparent"
                />
              </div>

              {/* Weight */}
              <div className="bg-white border border-[#F1F5F9] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-[24px] p-4 pb-5 flex flex-col gap-1.5 focus-within:border-primary transition-colors">
                <label className="text-slate-400 text-[11px] font-medium">
                  {unit === "metric" ? t("avatar.measurements.weightKg", "Weight (kg)") : t("avatar.measurements.weightLbs", "Weight (lbs)")}
                </label>
                <input
                  {...register("weight", { valueAsNumber: true })}
                  type="number"
                  placeholder="68"
                  className="w-full text-slate-800 text-[20px] font-semibold outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Detailed Measurements */}
          <div className="space-y-4 pt-2">
            <h4 className="text-[#64748B] text-[11px] font-bold tracking-[1.2px] uppercase">
              {t("avatar.measurements.detailedMeasurements", "DETAILED MEASUREMENTS")}
            </h4>
            <div className="space-y-3">
              {/* Chest */}
              <div className="bg-white border border-[#F1F5F9] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-[24px] p-4 flex items-center justify-between focus-within:border-primary transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Scan className="text-primary w-[20px] h-[20px]" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h5 className="text-slate-800 text-[14px] font-bold mb-0.5">
                      {t("avatar.measurements.chest", "Chest")}
                    </h5>
                    <p className="text-[#94A3B8] text-[10px] font-medium">
                      {t("avatar.measurements.chestDesc", "Circumference at widest point")}
                    </p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 pr-2">
                  <input
                    {...register("chest", { valueAsNumber: true })}
                    type="number"
                    placeholder="94"
                    className="w-10 text-right text-slate-800 text-[18px] font-bold outline-none bg-transparent"
                  />
                  <span className="text-[#94A3B8] text-[12px] font-medium">
                    {unit === "metric" ? "cm" : "in"}
                  </span>
                </div>
              </div>

              {/* Waist */}
              <div className="bg-white border border-[#F1F5F9] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-[24px] p-4 flex items-center justify-between focus-within:border-primary transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Activity className="text-primary w-[20px] h-[20px]" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h5 className="text-slate-800 text-[14px] font-bold mb-0.5">
                      {t("avatar.measurements.waist", "Waist")}
                    </h5>
                    <p className="text-[#94A3B8] text-[10px] font-medium">
                      {t("avatar.measurements.waistDesc", "Natural waistline area")}
                    </p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 pr-2">
                  <input
                    {...register("waist", { valueAsNumber: true })}
                    type="number"
                    placeholder="78"
                    className="w-10 text-right text-slate-800 text-[18px] font-bold outline-none bg-transparent"
                  />
                  <span className="text-[#94A3B8] text-[12px] font-medium">
                    {unit === "metric" ? "cm" : "in"}
                  </span>
                </div>
              </div>

              {/* Hips */}
              <div className="bg-white border border-[#F1F5F9] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-[24px] p-4 flex items-center justify-between focus-within:border-primary transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CircleDashed className="text-primary w-[20px] h-[20px]" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h5 className="text-slate-800 text-[14px] font-bold mb-0.5">
                      {t("avatar.measurements.hips", "Hips")}
                    </h5>
                    <p className="text-[#94A3B8] text-[10px] font-medium">
                      {t("avatar.measurements.hipsDesc", "Fullest part of hips")}
                    </p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 pr-2">
                  <input
                    {...register("hips", { valueAsNumber: true })}
                    type="number"
                    placeholder="102"
                    className="w-10 text-right text-slate-800 text-[18px] font-bold outline-none bg-transparent"
                  />
                  <span className="text-[#94A3B8] text-[12px] font-medium">
                    {unit === "metric" ? "cm" : "in"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Floating Continue Button */}
      <div className="absolute bottom-10 left-6 right-6 z-20 flex justify-center">
        <button
          form="measurements-form"
          type="submit"
          className="w-full max-w-[342px] flex items-center justify-center gap-[4px] py-[16px] text-[16px] font-bold text-white bg-primary rounded-full shadow-[0_10px_15px_-3px_rgba(var(--primary-rgb),0.2),0_4px_6px_-4px_rgba(var(--primary-rgb),0.2)] active:scale-95 transition-all"
        >
          {t("avatar.measurements.continue", "Continue")}
          <ArrowRight className="w-[18px] h-[18px] ml-1" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
