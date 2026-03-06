import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  value: number;       // 0–100
  className?: string;
  showLabel?: boolean;
  color?: string;
}

export function ProgressBar({ value, className, showLabel = false, color }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-1 flex justify-between text-xs text-[var(--text-secondary)]">
          <span>Tiến trình</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--border-light)]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${clamped}%`,
            background: color ?? "var(--primary)",
          }}
        />
      </div>
    </div>
  );
}
