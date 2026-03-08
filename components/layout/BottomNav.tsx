"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Shirt, Sparkles, User, Focus } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils/cn";

function NavItem({
  href,
  icon: Icon,
  label,
  isActive,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}) {
  return (
    <a href={href} className="flex w-15 flex-col items-center gap-0.5">
      <div className="relative flex items-center justify-center px-3 py-1.5">
        {isActive && (
          <motion.div
            layoutId="nav-active-pill"
            className="absolute inset-0 rounded-full bg-[#e8f0ef]"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        )}
        <motion.div
          animate={{ scale: isActive ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="relative z-10"
        >
          <Icon
            size={22}
            strokeWidth={isActive ? 2.5 : 1.8}
            className={isActive ? "text-primary" : "text-text-tertiary"}
          />
        </motion.div>
      </div>
      <motion.span
        suppressHydrationWarning
        animate={{ fontWeight: isActive ? 700 : 500 }}
        className={cn(
          "text-[10px]",
          isActive ? "text-primary" : "text-text-tertiary"
        )}
      >
        {label}
      </motion.span>
    </a>
  );
}

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  const LEFT_ITEMS = [
    { href: "/home", icon: Home, label: t("nav.home") },
    { href: "/ai-stylist", icon: Sparkles, label: t("nav.aiTryon") },
  ];

  const RIGHT_ITEMS = [
    { href: "/wardrobe", icon: Shirt, label: t("nav.wardrobe") },
    { href: "/profile", icon: User, label: t("nav.profile") },
  ];

  return (
    <motion.nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full z-50"
      style={{ height: "110px", maxWidth: "430px" }}
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
    >
      {/* Floating white pill */}
      <div
        className="absolute left-5 right-5 bottom-5 flex h-17.5 items-center justify-around rounded-[35px] bg-white"
        style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
      >
        {LEFT_ITEMS.map(({ href, icon, label }) => (
          <NavItem
            key={href}
            href={href}
            icon={icon}
            label={label}
            isActive={pathname.startsWith(href)}
          />
        ))}
        {/* Spacer for center button */}
        <div className="w-14" />
        {RIGHT_ITEMS.map(({ href, icon, label }) => (
          <NavItem
            key={href}
            href={href}
            icon={icon}
            label={label}
            isActive={pathname.startsWith(href)}
          />
        ))}
      </div>

      {/* Elevated center scan button */}
      <motion.button
        onClick={() => router.push("/avatar/scan")}
        className="absolute left-1/2 -translate-x-1/2 bottom-11.5 flex h-14.5 w-14.5 items-center justify-center rounded-4xl border-[3px] border-[#f1f5f9]"
        style={{
          background: "linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 70%, black) 100%)",
          boxShadow: "0 8px 20px color-mix(in srgb, var(--primary) 45%, transparent), 0 2px 6px color-mix(in srgb, var(--primary) 20%, transparent)",
        }}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-label="Quét avatar"
      >
        <Focus size={30} className="text-white" strokeWidth={2} />
      </motion.button>
    </motion.nav>
  );
}
