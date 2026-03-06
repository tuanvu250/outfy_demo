"use client";

import { Camera, Upload } from "lucide-react";
import { ActionButton } from "@/components/shared/ActionButton";

export default function AvatarScanPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] px-4 py-8 items-center">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Scan Avatar</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-8">Bước 3/3 — Upload 2 ảnh để AI tạo avatar 3D</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {["Mặt trước", "Mặt bên"].map((label) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-[var(--primary)]/30 bg-[var(--primary)]/5 py-10 cursor-pointer hover:bg-[var(--primary)]/10 transition-colors"
            >
              <Camera size={28} className="text-[var(--primary)]" />
              <span className="text-sm font-medium text-[var(--text-secondary)]">{label}</span>
              <span className="text-xs text-[var(--text-tertiary)]">Tap để upload</span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 mb-8 text-xs text-amber-700 space-y-1">
          <p className="font-semibold">Lưu ý khi chụp:</p>
          <p>• Đứng thẳng, hai tay duỗi nhẹ</p>
          <p>• Mặc quần áo bó sát</p>
          <p>• Ánh sáng đầy đủ, nền đơn giản</p>
        </div>

        <ActionButton fullWidth>Tạo Avatar 3D</ActionButton>
      </div>
    </div>
  );
}
