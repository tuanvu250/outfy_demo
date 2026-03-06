"use client";

import Link from "next/link";
import { useState } from "react";
import { Venus, Mars, Transgender } from "lucide-react";
import { ActionButton } from "@/components/shared/ActionButton";

const GENDERS = [
  { id: "female", label: "Nữ", Icon: Venus },
  { id: "male", label: "Nam", Icon: Mars },
  { id: "non-binary", label: "Khác", Icon: Transgender },
];

export default function AvatarSetupPage() {
  const [gender, setGender] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] px-4 py-8 items-center">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Tạo Avatar</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-8">Bước 1/3 — Chọn giới tính</p>

        <div className="grid grid-cols-3 gap-3 mb-10">
          {GENDERS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setGender(id)}
              className={`flex flex-col items-center gap-3 rounded-3xl border-2 py-6 transition-all ${
                gender === id
                  ? "border-[var(--primary)] bg-[var(--primary)]/10"
                  : "border-[var(--border-light)] bg-[var(--surface)]"
              }`}
            >
              <Icon
                size={36}
                stroke={gender === id ? "var(--primary)" : "#94A3B8"}
                strokeWidth={1.5}
              />
              <span className={`text-sm font-medium ${gender === id ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"}`}>
                {label}
              </span>
            </button>
          ))}
        </div>

        <Link href="/avatar/measurements">
          <ActionButton fullWidth disabled={!gender}>Tiếp theo</ActionButton>
        </Link>
      </div>
    </div>
  );
}
