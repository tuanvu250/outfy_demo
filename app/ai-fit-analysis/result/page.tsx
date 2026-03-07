"use client";

import { Header } from "@/components/layout/Header";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function AiFitAnalysisResultPage() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header title={t("aiFitAnalysis.results.pageTitle")} showBack />

            <div className="relative flex flex-col flex-1 pb-8">
                {/* Image Container */}
                <div className="px-4 pt-4">
                    <div className="relative w-full aspect-[4/5] max-h-[45vh] bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-sm">
                        <Image
                            src="/images/3dfull.png"
                            alt="Avatar Model"
                            fill
                            className="object-cover object-top opacity-90"
                        />
                        {/* Overlay Badge */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
                            <div className="bg-(--primary) text-white px-6 py-2 rounded-full font-bold text-sm shadow-[0_8px_16px_color-mix(in_srgb,var(--primary)_30%,transparent)] whitespace-nowrap">
                                {t("aiFitAnalysis.results.recommendedSize")}: M
                            </div>
                        </div>
                    </div>
                </div>

                {/* Analysis Bottom Sheet Layout */}
                <div className="relative flex-1 bg-white -mt-6 rounded-t-3xl border-t border-[var(--border-light)] px-5 pt-6 pb-6 shadow-[0px_-8px_20px_rgba(0,0,0,0.05)] z-20">
                    {/* Handle */}
                    <div className="flex justify-center -mt-2 mb-6">
                        <div className="w-12 h-1 bg-slate-200 rounded-full" />
                    </div>

                    {/* Fit Score Row */}
                    <div className="flex items-center gap-6 mb-8">
                        {/* Circular Progress */}
                        <div className="relative w-[110px] h-[110px] flex-shrink-0">
                            <div
                                className="w-full h-full rounded-full flex items-center justify-center p-2.5"
                                style={{ background: "conic-gradient(var(--primary) 92%, #f1f5f9 0)" }}
                            >
                                <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center shadow-sm">
                                    <span className="text-[32px] font-black text-slate-800 tracking-tight leading-none">92%</span>
                                    <span className="text-[9px] uppercase font-bold text-slate-400 mt-1">{t("aiFitAnalysis.results.fitScore")}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5 flex-1">
                            <h3 className="text-[20px] font-bold text-slate-800">{t("aiFitAnalysis.results.excellentFit")}</h3>
                            <p className="text-[14px] text-slate-500 leading-[1.45]">
                                {t("aiFitAnalysis.results.excellentFitDesc")}
                            </p>
                        </div>
                    </div>

                    {/* Breakdown Metrics */}
                    <div className="flex flex-col gap-5 mb-8">
                        {/* Chest */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className="text-[14px] font-medium text-slate-600">{t("aiFitAnalysis.results.chest")}</span>
                                <span className="text-[14px] font-bold text-[var(--secondary)]">{t("aiFitAnalysis.results.slightlyTight")}</span>
                            </div>
                            <div className="h-2 w-full bg-[#f1f5f9] rounded-full overflow-hidden">
                                <div className="h-full bg-[var(--secondary)] rounded-full w-[85%]" />
                            </div>
                        </div>

                        {/* Waist */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className="text-[14px] font-medium text-slate-600">{t("aiFitAnalysis.results.waist")}</span>
                                <span className="text-[14px] font-bold text-[#38e07b]">{t("aiFitAnalysis.results.perfect")}</span>
                            </div>
                            <div className="h-2 w-full bg-[#f1f5f9] rounded-full overflow-hidden">
                                <div className="h-full bg-[#38e07b] rounded-full w-full" />
                            </div>
                        </div>

                        {/* Shoulders */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className="text-[14px] font-medium text-slate-600">{t("aiFitAnalysis.results.shoulders")}</span>
                                <span className="text-[14px] font-bold text-[#3b82f6]">{t("aiFitAnalysis.results.loose")}</span>
                            </div>
                            <div className="h-2 w-full bg-[#f1f5f9] rounded-full overflow-hidden">
                                <div className="h-full bg-[#3b82f6] rounded-full w-[60%]" />
                            </div>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="mt-auto">
                        <button className="w-full h-[56px] bg-(--primary) text-white rounded-full font-bold text-[16px] shadow-[0_8px_20px_color-mix(in_srgb,var(--primary)_30%,transparent)] transition-transform active:scale-[0.98]">
                            {t("aiFitAnalysis.results.addSizeToCart", { size: "M" })}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
