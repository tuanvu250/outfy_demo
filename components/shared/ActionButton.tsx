import { cn } from "@/lib/utils/cn";
import { Loader2 } from "lucide-react";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses = {
  primary:
    "bg-[var(--primary)] text-white hover:opacity-90 active:opacity-80 shadow-[0_4px_4px_rgba(48,123,117,0.3)]",
  secondary:
    "bg-[var(--secondary)] text-white hover:opacity-90 active:opacity-80 shadow-sm",
  outline:
    "border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10",
  ghost:
    "text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)]",
  danger:
    "bg-red-500 text-white hover:opacity-90 active:opacity-80",
};

const sizeClasses = {
  sm: "h-8 px-3 text-xs rounded-full",
  md: "h-10 px-4 text-sm rounded-full",
  lg: "h-14 px-6 text-base rounded-full",
};

export function ActionButton({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}: ActionButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}
