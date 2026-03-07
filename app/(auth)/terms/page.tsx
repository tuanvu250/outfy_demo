"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shield, FileText, AlignLeft, ChevronRight, Check } from "lucide-react";

const POLICIES = [
  {
    icon: Shield,
    title: "Chính sách Bảo mật",
    subtitle: "Cách chúng tôi xử lý dữ liệu quét 3D",
  },
  {
    icon: FileText,
    title: "Điều khoản Dịch vụ",
    subtitle: "Quy tắc sử dụng tính năng AI",
  },
  {
    icon: AlignLeft,
    title: "Sử dụng Dữ liệu",
    subtitle: "Quản lý hồ sơ phong cách của bạn",
  },
];

export default function TermsPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#f1f5f9] px-6">
      {/* Back button */}
      <div className="pt-12 pb-2">
        <button onClick={() => router.back()} className="p-2 -ml-2 active:opacity-60">
          <ArrowLeft size={20} stroke="#0f172a" />
        </button>
      </div>

      {/* Shield icon */}
      <div className="flex justify-center mb-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#edf6f5] border-2">
          <Shield size={40} stroke="var(--primary)" strokeWidth={2} />
        </div>
      </div>

      {/* Main content */}
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-[#0f172a] mb-3">
          Xem xét và Chấp nhận
        </h1>
        <p className="text-base leading-relaxed text-[#475569] mb-6">
          Để mở khóa tính năng phối đồ AI cá nhân và quét cơ thể 3D, vui lòng xem
          xét các chính sách cộng đồng và điều khoản bảo vệ dữ liệu của chúng tôi.
        </p>

        {/* Policy cards */}
        <div className="space-y-3 mb-6">
          {POLICIES.map(({ icon: Icon, title, subtitle }) => (
            <button
              key={title}
              className="flex w-full items-center gap-4 rounded-2xl bg-white px-4 py-4 shadow-sm active:opacity-70"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#edf6f5]">
                <Icon size={20} stroke="var(--primary)" strokeWidth={1.8} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-[#0f172a]">{title}</p>
                <p className="text-xs text-[#94a3b8] mt-0.5">{subtitle}</p>
              </div>
              <ChevronRight size={18} stroke="#94a3b8" />
            </button>
          ))}
        </div>

        {/* Checkbox agreement */}
        <button
          onClick={() => setAgreed((v) => !v)}
          className="flex items-start gap-3 text-left active:opacity-70"
        >
          <div
            className={`mt-0.5 h-5 w-5 flex-shrink-0 rounded-full border-2 transition-colors flex items-center justify-center ${agreed ? "border-[var(--primary)] bg-[var(--primary)]" : "border-[#cbd5e1] bg-white"
              }`}
          >
            {agreed && <Check size={12} stroke="white" strokeWidth={3} />}
          </div>
          <p className="text-base leading-relaxed text-[#475569]">
            Tôi đã đọc và đồng ý với{" "}
            <span className="font-bold text-[var(--primary)]">Điều khoản Dịch vụ</span>{" "}
            và{" "}
            <span className="font-bold text-[var(--primary)]">Chính sách B.mật</span>.
            {" "}Tôi hiểu cách dữ liệu quét 3D của tôi được xử lý.
          </p>
        </button>
      </div>

      {/* Bottom */}
      <div className="mt-auto pb-8 pt-6">
        <button
          onClick={() => router.push("/home")}
          disabled={!agreed}
          className="h-14 w-full rounded-full bg-[var(--primary)] text-base font-bold text-white transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-40"
          style={{ boxShadow: agreed ? "0 4px 6px color-mix(in srgb, var(--primary) 25%, transparent)" : "none" }}
        >
          Xác Nhận &amp; Tiếp Tục
        </button>
        <p className="mt-4 text-center text-[10px] text-[#94a3b8]">
          Phiên bản 2.4.0 • Cập nhật lần cuối T10 2023
        </p>
      </div>
    </div>
  );
}
