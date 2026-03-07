"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  className?: string;
  actions?: React.ReactNode;
}

export function Header({ title = "Outfy", showBack = false, className, actions }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-14 items-center justify-between bg-[var(--surface)]/80 px-4 backdrop-blur-md border-b border-[var(--border-light)]",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            onClick={() => window.history.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--background)] transition-colors"
            aria-label="Quay lại"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        {title === "Outfy" ? (
          <div className="flex items-center gap-2">
            <Image
              src="/images/Logo-black-mini.png"
              alt="Outfy Logo"
              width={24}
              height={24}
              className="object-contain dark:invert"
            />
            <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
              {title}
            </span>
          </div>
        ) : (
          <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
            {title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {actions}
        <Link
          href="/notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--background)] transition-colors"
          aria-label="Thông báo"
        >
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--primary)]" />
        </Link>
      </div>
    </header>
  );
}
