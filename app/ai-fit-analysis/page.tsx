"use client";

import { Header } from "@/components/layout/Header";
import { Upload, Scan, CheckCircle, AlertCircle } from "lucide-react";
import { ActionButton } from "@/components/shared/ActionButton";
import { ProgressBar } from "@/components/shared/ProgressBar";

export default function AiFitAnalysisPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="AI Fit Analysis" showBack />
      <div className="flex flex-col items-center p-4 gap-6">
        {/* Upload Area */}
        <div className="w-full rounded-3xl border-2 border-dashed border-[var(--primary)]/30 bg-[var(--primary)]/5 py-10 flex flex-col items-center gap-3 cursor-pointer hover:bg-[var(--primary)]/10 transition-colors">
          <Scan size={36} className="text-[var(--primary)]" />
          <p className="font-semibold text-[var(--text-primary)]">Upload trang phục để phân tích</p>
          <p className="text-sm text-[var(--text-secondary)]">JPG, PNG — tối đa 10MB</p>
        </div>

        <ActionButton fullWidth>Phân tích Fit</ActionButton>

        {/* Result Preview (static demo) */}
        <div className="w-full rounded-3xl border border-[var(--border-light)] bg-[var(--surface)] p-5 space-y-4">
          <h3 className="font-bold text-[var(--text-primary)]">Kết quả phân tích</h3>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-secondary)]">Fit Score</span>
            <span className="text-2xl font-black text-[var(--primary)]">82</span>
          </div>
          <ProgressBar value={82} />

          <div className="space-y-2">
            {[
              { ok: true, text: "Size phù hợp với số đo của bạn" },
              { ok: true, text: "Màu sắc hài hòa với tông da" },
              { ok: false, text: "Eo hơi rộng — có thể thử size S" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                {item.ok ? (
                  <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm text-[var(--text-primary)]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
