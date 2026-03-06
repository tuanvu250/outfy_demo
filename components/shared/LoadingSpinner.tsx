import { cn } from "@/lib/utils/cn";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  label?: string;
}

export function LoadingSpinner({ size = 24, className, label = "Đang tải..." }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <Loader2
        size={size}
        className="animate-spin text-[var(--primary)]"
        aria-hidden="true"
      />
      {label && (
        <p className="text-sm text-[var(--text-secondary)]">{label}</p>
      )}
    </div>
  );
}
