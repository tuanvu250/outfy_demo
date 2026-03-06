"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Shirt, Sparkles, User, Upload, Swords, Share2, Scan, ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/home", icon: Home, label: "Trang chủ" },
  { href: "/wardrobe", icon: Shirt, label: "Tủ đồ" },
  { href: "/ai-stylist", icon: Sparkles, label: "AI Stylist" },
  { href: "/upload", icon: Upload, label: "Upload" },
  { href: "/outfit-duel", icon: Swords, label: "Outfit Duel" },
  { href: "/ai-fit-analysis", icon: Scan, label: "AI Fit Analysis" },
  { href: "/share-look", icon: Share2, label: "Share Look" },
  { href: "/profile", icon: User, label: "Hồ sơ" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:left-0 bg-[var(--surface)] border-r border-[var(--border-light)] z-40">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-[var(--border-light)]">
        <span className="text-2xl font-black tracking-tight">
          <span className="text-[var(--primary)]">Out</span>
          <span className="text-[var(--text-primary)]">fy</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)]"
                  )}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
