"use client";

import { ArrowLeft, Heart, Share2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = {
    id: params.id,
    name: "Nike Blazer Mid '77 Vintage",
    brand: "Nike",
    price: 2343000,
    reviewCount: 2000,
    description:
      "In the '70s, Nike was the new shoe on the block. So new in fact, we were still breaking into the basketball scene and testing prototypes on the feet of our local team. Of course, the design improved over the years, but the name stuck. The Nike Blazer Mid '77 Vintage—classic since the beginning.",
    details: [
      "Colour Shown: White/Black",
      "Style: BQ6806-100",
      "Country/Region of Origin: Indonesia, India, Vietnam",
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button
          onClick={() => window.history.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f5f9]"
          aria-label="Quay lại"
        >
          <ArrowLeft size={20} className="text-text-primary" />
        </button>
        <h1 className="text-[15px] font-bold uppercase tracking-[0.5px] text-text-primary">
          Chi Tiết Sản Phẩm
        </h1>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f5f9]"
          aria-label="Chia sẻ"
        >
          <Share2 size={18} className="text-text-primary" />
        </button>
      </div>

      {/* Product Image */}
      <div
        className="mx-4 overflow-hidden rounded-2xl bg-[#f8f8f8]"
        style={{ aspectRatio: "4/3" }}
      >
        <div className="relative h-full w-full">
          <Image
            src="/images/product.png"
            alt={product.name}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Price + likes */}
      <div className="mt-4 flex items-center justify-between px-5">
        <p className="text-[26px] font-black text-(--primary)">
          {formatCurrency(product.price)}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-text-secondary">
            {product.reviewCount >= 1000
              ? `${(product.reviewCount / 1000).toFixed(0)}k+`
              : product.reviewCount}
          </span>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1f5f9]">
            <Heart size={18} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Name (link style) */}
      <div className="mt-1 px-5">
        <Link
          href="#"
          className="text-[15px] font-semibold text-(--secondary) underline underline-offset-2"
        >
          {product.name}
        </Link>
      </div>

      {/* Description */}
      <div className="mt-4 px-5 space-y-2">
        <p className="text-[13px] leading-relaxed text-text-secondary">
          {product.description}
        </p>
        <ul className="mt-3 space-y-1">
          {product.details.map((d) => (
            <li key={d} className="text-[13px] text-text-secondary">
              • {d}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-5 pb-8 pt-3">
        <Link
          href="/avatar/scan"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full text-[15px] font-bold text-white"
          style={{
            background:
              "linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 70%, black) 100%)",
            boxShadow:
              "0 8px 20px color-mix(in srgb, var(--primary) 35%, transparent)",
          }}
        >
          <Users size={20} />
          THỬ VỚI AVATAR
        </Link>
      </div>
    </div>
  );
}
