import { cn } from "@/lib/utils/cn";
import { X } from "lucide-react";

interface FilterChipProps {
  label: string;
  active?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
  className?: string;
}

export function FilterChip({ label, active = false, onToggle, onRemove, className }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all",
        active
          ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
          : "border-[var(--border-light)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--primary)]/40",
        className
      )}
    >
      {label}
      {onRemove && active && (
        <X
          size={12}
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="cursor-pointer"
          aria-label={`Xóa bộ lọc ${label}`}
        />
      )}
    </button>
  );
}
