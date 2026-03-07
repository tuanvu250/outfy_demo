"use client";

import { Suspense, useRef, useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";

function OtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") ?? "+1 (555) ···89";

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [countdown, setCountdown] = useState(59);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const canResend = countdown <= 0;

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = () => {
    setCountdown(59);
    setOtp(Array(6).fill(""));
    inputs.current[0]?.focus();
  };

  const handleChange = useCallback((index: number, value: string) => {
    const digit = value.replace(/\D/, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 5) inputs.current[index + 1]?.focus();
  }, [otp]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }, [otp]);

  const isComplete = otp.every((d) => d !== "");
  const timerDisplay = `00:${String(countdown).padStart(2, "0")}`;

  return (
    <div className="flex min-h-screen flex-col bg-white px-6">
      {/* Header */}
      <div className="relative flex items-center justify-center pt-12 pb-4">
        <button onClick={() => router.back()} className="absolute left-0 p-2 active:opacity-60">
          <ArrowLeft size={20} stroke="#0f172a" />
        </button>
        <span className="text-xs font-bold tracking-[2.5px] text-[var(--primary)] uppercase">Bảo Mật</span>
      </div>

      {/* Avatar circle */}
      <div className="flex justify-center mt-8 mb-8">
        <div className="h-24 w-24 rounded-full bg-[var(--secondary)]" />
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-extrabold text-[#0f172a] mb-3">Mã Xác Nhận</h1>
        <p className="text-sm text-[var(--primary)]">Nhập mã 6 chữ số đã gửi đến</p>
        <p className="text-sm font-semibold text-[var(--primary)] mt-0.5">{phone}</p>
      </div>

      {/* OTP inputs */}
      <div className="flex justify-center gap-3 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            ref={(el) => { inputs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="h-14 w-12 rounded-2xl border-2 border-[#e2e8f0] bg-[#f8fafc] text-center text-xl font-bold text-[#0f172a] outline-none transition-all focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        ))}
      </div>

      {/* Timer & resend */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 rounded-full bg-[#f1f5f9] px-4 py-2">
          <Clock size={14} stroke="#475569" />
          <span className="text-sm font-semibold text-[#475569]">{timerDisplay}</span>
        </div>
        <p className="text-sm text-[#475569]">
          Chưa nhận được mã?{" "}
          <button
            onClick={canResend ? handleResend : undefined}
            className={`font-bold ${canResend ? "text-[var(--primary)] active:opacity-60" : "text-[var(--primary)] opacity-50 cursor-default"}`}
          >
            Gửi lại OTP
          </button>
        </p>
      </div>

      {/* Confirm button */}
      <div className="mt-auto pb-10 pt-6">
        <button
          onClick={() => router.push("/terms")}
          disabled={!isComplete}
          className="h-14 w-full rounded-full bg-[var(--primary)] text-base font-bold text-white transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-40"
          style={{ boxShadow: "0 4px 6px color-mix(in srgb, var(--primary) 25%, transparent)" }}
        >
          Xác Nhận &amp; Tiếp Tục
        </button>
      </div>
    </div>
  );
}

export default function OtpPage() {
  return (
    <Suspense>
      <OtpContent />
    </Suspense>
  );
}
