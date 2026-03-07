"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, RotateCw } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AvatarResultPage() {
    const router = useRouter();
    const { t } = useTranslation();

    // Slider States
    const [waist, setWaist] = useState(68);
    const [hips, setHips] = useState(94);
    const [shoulders, setShoulders] = useState(42);

    // Helper to calculate exact background size percentage for modern slider styling
    const getGradientPercent = (val: number, min: number, max: number) => {
        return ((val - min) / (max - min)) * 100;
    };

    return (
        <div className="flex flex-col min-h-dvh bg-white font-sans">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-8 pb-2">
                <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-start">
                    <ChevronLeft className="w-6 h-6 text-[#0f172a]" />
                </button>
                <span className="text-[18px] font-bold text-[#0f172a] flex-1 text-center mr-10 py-2 tracking-[-0.45px]">
                    {t("avatar.scan.editTitle", "Edit 3D Avatar")}
                </span>
            </div>

            <div className="flex-1 overflow-y-auto px-6 overflow-x-hidden">
                {/* 3D Viewer Area */}
                <div className="relative w-full aspect-4/5 max-h-[460px] bg-linear-to-t from-slate-800 to-slate-900 rounded-[32px] overflow-hidden shadow-lg mt-2 mb-8 mx-auto flex items-center justify-center">
                    <Image
                        src="/images/scan/3.png"
                        alt="3D Avatar Preview"
                        fill
                        className="object-contain object-bottom pt-2"
                        priority
                    />

                    {/* Rotate/View Icon overlay */}
                    <div className="absolute right-4 bottom-4 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center pointer-events-none">
                        <RotateCw className="text-white/80 w-5 h-5" />
                    </div>
                </div>

                {/* Adjust Proportions Header */}
                <h3 className="text-[18px] font-bold text-[#0f172a] mb-2">
                    {t("avatar.scan.adjustProportions", "Adjust Proportions")}
                </h3>

                {/* Sliders Container */}
                <div className="flex flex-col gap-8 pb-8">

                    {/* Waist Slider */}
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[14px] text-[#94a3b8]">
                                {t("avatar.measurements.waist", "Waist")}
                            </span>
                            <span className="text-[14px] text-secondary">
                                {waist} cm
                            </span>
                        </div>
                        <div className="relative h-6 flex items-center">
                            <input
                                type="range"
                                min={50}
                                max={100}
                                value={waist}
                                onChange={(e) => setWaist(Number(e.target.value))}
                                className="w-full absolute z-20 opacity-0 cursor-ew-resize h-full"
                            />
                            {/* Custom Track */}
                            <div className="w-full h-1.5 bg-slate-800 rounded-full relative overflow-hidden">
                                <div
                                    className="absolute left-0 top-0 bottom-0 bg-primary"
                                    style={{ width: `${getGradientPercent(waist, 50, 100)}%` }}
                                />
                            </div>
                            {/* Custom Thumb */}
                            <div
                                className="absolute w-6 h-6 bg-white border-2 border-primary rounded-full shadow-md z-10 -ml-3"
                                style={{ left: `${getGradientPercent(waist, 50, 100)}%` }}
                            />
                        </div>
                    </div>

                    {/* Hips Slider */}
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[14px] text-[#94a3b8]">
                                {t("avatar.measurements.hips", "Hips")}
                            </span>
                            <span className="text-[14px] text-secondary">
                                {hips} cm
                            </span>
                        </div>
                        <div className="relative h-6 flex items-center">
                            <input
                                type="range"
                                min={70}
                                max={130}
                                value={hips}
                                onChange={(e) => setHips(Number(e.target.value))}
                                className="w-full absolute z-20 opacity-0 cursor-ew-resize h-full"
                            />
                            <div className="w-full h-1.5 bg-slate-800 rounded-full relative overflow-hidden">
                                <div
                                    className="absolute left-0 top-0 bottom-0 bg-primary"
                                    style={{ width: `${getGradientPercent(hips, 70, 130)}%` }}
                                />
                            </div>
                            <div
                                className="absolute w-6 h-6 bg-white border-2 border-primary rounded-full shadow-md z-10 -ml-3"
                                style={{ left: `${getGradientPercent(hips, 70, 130)}%` }}
                            />
                        </div>
                    </div>

                    {/* Shoulders Slider */}
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[14px] text-[#94a3b8]">
                                {t("avatar.scan.shoulders", "Shoulders")}
                            </span>
                            <span className="text-[14px] text-secondary">
                                {shoulders} cm
                            </span>
                        </div>
                        <div className="relative h-4 flex items-center">
                            <input
                                type="range"
                                min={30}
                                max={60}
                                value={shoulders}
                                onChange={(e) => setShoulders(Number(e.target.value))}
                                className="w-full absolute z-20 opacity-0 cursor-ew-resize h-full"
                            />
                            <div className="w-full h-1.5 bg-slate-800 rounded-full relative overflow-hidden">
                                <div
                                    className="absolute left-0 top-0 bottom-0 bg-primary"
                                    style={{ width: `${getGradientPercent(shoulders, 30, 60)}%` }}
                                />
                            </div>
                            <div
                                className="absolute w-6 h-6 bg-white border-2 border-primary rounded-full shadow-md z-10 -ml-3"
                                style={{ left: `${getGradientPercent(shoulders, 30, 60)}%` }}
                            />
                        </div>
                    </div>

                </div>

                {/* Finish Button */}
                <div className="pb-4">
                    <button
                        onClick={() => router.push("/profile")}
                        className="w-full h-14 bg-primary text-white font-bold text-[18px] rounded-full shadow-[0_10px_15px_-3px_rgba(var(--primary-rgb),0.3)] flex items-center justify-center"
                    >
                        {t("avatar.scan.finish", "Finish")}
                    </button>
                </div>

            </div>

        </div>
    );
}
