"use client";

import { Header } from "@/components/layout/Header";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const outfits = [
  {
    key: "A",
    label: "OUTFIT A",
    image: "/images/3dfullv1.png",
    tags: ["Cyberpunk", "Neon"],
    cost: "$249.00",
    btnColor: "bg-[var(--primary)]",
  },
  {
    key: "B",
    label: "OUTFIT B",
    image: "/images/3dfullv2.png",
    tags: ["Minimal", "Classic"],
    cost: "$412.50",
    btnColor: "bg-[var(--secondary)]",
  },
];

export default function OutfitDuelPage() {
  const { t } = useTranslation();

  const metrics = [
    { label: t("outfitDuel.versatility"), a: "8.4", b: "6.2" },
    { label: t("outfitDuel.trendScore"), a: "High", b: "Mid" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      <Header title={t("outfitDuel.title")} showBack />

      {/* Split avatar section — tall enough to show full body */}
      <div className="relative w-full" style={{ height: 520 }}>
        {/* Left half */}
        <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-[#1a1a1a]">
          <Image
            src={outfits[0].image}
            alt="Outfit A"
            className="object-cover object-top"
            sizes="50vw"
            fill
          />
          <span className="absolute top-3 left-3 bg-black/50 text-white text-[10px] font-bold tracking-widest px-2 py-1 rounded-full">
            OUTFIT A
          </span>
        </div>
        {/* Right half */}
        <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden bg-[#1c1c1a]">
          <Image
            src={outfits[1].image}
            alt="Outfit B"
            fill
            className="object-cover object-top"
            sizes="50vw"
          />
          <span className="absolute top-3 right-3 bg-black/50 text-white text-[10px] font-bold tracking-widest px-2 py-1 rounded-full">
            OUTFIT B
          </span>
        </div>
        {/* VS badge */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center">
            <span className="text-sm font-extrabold text-[var(--text-primary)]">VS</span>
          </div>
        </div>
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </div>

      {/* Synchronized view indicator */}
      <div className="flex items-center justify-center gap-2 py-2">
        <RefreshCw size={13} className="text-[var(--primary)]" />
        <span className="text-[10px] font-semibold tracking-widest text-[var(--text-secondary)] uppercase">
          {t("outfitDuel.synchronizedView")}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
      </div>

      {/* Outfit cards */}
      <div className="flex gap-3 px-4 mt-1">
        {outfits.map((outfit) => (
          <div
            key={outfit.key}
            className="flex-1 rounded-2xl border border-[var(--border-light)] bg-[var(--surface)] p-3"
          >
            <div className="flex gap-1.5 flex-wrap mb-2">
              {outfit.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-[var(--border-light)] text-[var(--text-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-[var(--text-tertiary)]">{t("outfitDuel.totalCost")}</p>
            <p className="text-lg font-bold text-[var(--text-primary)] mb-3">{outfit.cost}</p>
            <button
              className={`w-full py-2 rounded-xl text-white text-sm font-semibold ${outfit.btnColor} hover:opacity-90 transition-opacity`}
            >
              {t("outfitDuel.getLook")}
            </button>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="mx-4 mt-4 divide-y divide-[var(--border-light)]">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between py-3">
            <span className="text-sm text-[var(--text-secondary)]">{m.label}</span>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="text-[var(--text-primary)]">{m.a}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2l4 8H2L6 2z" fill="#22c55e" />
              </svg>
              <span className="text-[var(--text-secondary)] font-normal">{m.b}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Vote button */}
      <div className="px-4 mt-4 mb-6">
        <button className="w-full py-3 rounded-2xl bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition-opacity">
          {t("outfitDuel.vote")}
        </button>
      </div>
    </div>
  );
}
