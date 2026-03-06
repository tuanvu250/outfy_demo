"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { measurementsSchema, MeasurementsFormData } from "@/lib/utils/validators";
import { ActionButton } from "@/components/shared/ActionButton";

const FIELDS = [
  { name: "height" as const, label: "Chiều cao (cm)", placeholder: "175" },
  { name: "weight" as const, label: "Cân nặng (kg)", placeholder: "65" },
  { name: "chest" as const, label: "Vòng ngực (cm)", placeholder: "90" },
  { name: "waist" as const, label: "Vòng eo (cm)", placeholder: "75" },
  { name: "hips" as const, label: "Vòng hông (cm)", placeholder: "95" },
];

export default function MeasurementsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MeasurementsFormData>({ resolver: zodResolver(measurementsSchema) });

  const onSubmit = (data: MeasurementsFormData) => console.log(data);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] px-4 py-8 items-center">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Số đo cơ thể</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-8">Bước 2/3 — Nhập số đo</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {FIELDS.map(({ name, label, placeholder }) => (
            <div key={name}>
              <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">{label}</label>
              <input
                {...register(name, { valueAsNumber: true })}
                type="number"
                placeholder={placeholder}
                className="w-full rounded-2xl border border-[var(--border-light)] bg-[var(--surface)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              />
              {errors[name] && (
                <p className="mt-1 text-xs text-red-500">{errors[name]?.message}</p>
              )}
            </div>
          ))}

          <div className="pt-4">
            <Link href="/avatar/scan">
              <ActionButton type="submit" fullWidth>Tiếp theo</ActionButton>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
