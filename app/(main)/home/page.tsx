"use client";

import { Bell, Heart, User, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BRANDS = [
  { name: "Nike", initial: "N", bg: "#D6D3A4" },
  { name: "Balenciaga", initial: "BB", bg: "#F1F5F9" },
  { name: "Gucci", initial: "G", bg: "#EADBBE" },
  { name: "Prada", initial: "P", bg: "#000000" },
  { name: "Off-White", initial: "X", bg: "#F8F9FA" },
];

const MOCK_PRODUCTS = [
  { id: "1", name: "Bộ sưu tập", category: "Jacket" },
  { id: "2", name: "Bộ sưu tập", category: "Shoes" },
  { id: "3", name: "Bộ sưu tập", category: "Hat" },
  { id: "4", name: "Bộ sưu tập", category: "Pants" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-5.5 py-4">
        <Link href="/profile">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <User size={20} className="text-text-primary" />
          </div>
        </Link>
        <h1 className="text-lg font-bold tracking-[0.5px] uppercase text-text-primary">Trang Chủ</h1>
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-background">
          <Bell size={20} className="text-text-primary" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </div>
      </div>

      {/* Hero Banner */}
      <section className="mx-5.5 mt-2 overflow-hidden rounded-2xl" style={{ height: "200px" }}>
        <div className="relative h-full w-full flex items-end">
          {/* Banner image */}
          <Image
            src="/images/banner.png"
            alt="Streetwear 2026"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 70%, transparent 100%)",
            }}
          />
          {/* Content */}
          <div className="relative z-10 p-6">
            <h2 className="text-[22px] font-bold text-white tracking-[-0.5px] leading-tight">Streetwear 2026</h2>
            <p className="mt-1 text-[11px] font-medium text-[#d1fae5]">Trải nghiệm tương lai thời trang trong 3D</p>
            <div className="mt-4">
              <Link
                href="/avatar/scan"
                className="inline-flex items-center rounded-full px-5 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
                style={{
                  background: "var(--primary)",
                  boxShadow: "0 10px 15px color-mix(in srgb, var(--primary) 40%, transparent), 0 4px 6px color-mix(in srgb, var(--primary) 30%, transparent)",
                }}
              >
                Thử ngay trong 3D
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="mt-8">
        <div className="flex items-center justify-between px-5.5">
          <h2 className="text-[17px] font-bold tracking-[-0.4px] text-text-primary">
            Thương Hiệu Nổi Bật
          </h2>
          <span className="cursor-pointer text-[10px] font-bold tracking-[1px] uppercase text-(--primary)">
            Xem Tất Cả
          </span>
        </div>
        <div className="mt-3 flex gap-6 overflow-x-auto px-5.5 pb-2">
          {BRANDS.map(({ name, initial, bg }) => (
            <div key={name} className="flex shrink-0 flex-col items-center gap-2">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full border border-border-light"
                style={{ backgroundColor: bg }}
              >
                <span className="text-base font-bold" style={{ color: "#0f172a" }}>
                  {initial}
                </span>
              </div>
              <span className="text-xs font-medium text-text-secondary">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* For You Products */}
      <section className="mt-6 px-5.5 pb-32">
        <h2 className="mb-3 text-[17px] font-bold tracking-[-0.4px] text-text-primary">
          Dành Cho Bạn
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {MOCK_PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group overflow-hidden rounded-2xl bg-surface transition-shadow hover:shadow-md"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
            >
              {/* Product image area */}
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "1/1" }}>
                <Image
                  src="/images/product.png"
                  alt={product.category}
                  fill
                  className="object-cover"
                />
                {/* Heart icon */}
                <div
                  className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 cursor-pointer z-10"
                  style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Heart size={14} className="text-text-tertiary" />
                </div>
                {/* Try on avatar badge */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full px-3 py-1" style={{ background: "color-mix(in srgb, var(--primary) 92%, transparent)", whiteSpace: "nowrap" }}>
                  <Zap size={10} className="text-white" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.5px] text-white">Try on Avatar</span>
                </div>
              </div>
              {/* Info */}
              <div className="px-3 pb-3 pt-2">
                <p className="truncate text-[13px] font-bold text-text-primary">{product.name}</p>
                <p className="text-[11px] text-text-secondary">{product.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
