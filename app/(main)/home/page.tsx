"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Plus,
  Share2,
  Star,
  ListFilter,
  Shirt,
  ChevronDown,
  ArrowLeftRight,
  Trash2,
  Check,
  HelpCircle,
  Zap,
  Sparkles,
  Users,
  Coins,
  Gem,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const SNAP_HEIGHTS = ["0px", "55vh", "85vh"];

const CATEGORIES = ["Tops", "Bottoms", "Shoes", "Outfits"];

const CLOTHING_ITEMS = [
  { id: 1, title: "Gray Hoodie", image: "/images/items/item1.png" },
  { id: 2, title: "Khaki Shorts", image: "/images/items/item2.png" },
];

const OUTFIT_ITEMS = [
  { id: 101, title: "Outfit 1", image: "/images/3dfullv1.png" },
  { id: 102, title: "Outfit 2", image: "/images/3dfullv2.png" },
];

function StatusBar({ icon: Icon, value, color }: { icon: React.ElementType; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/80 px-2 py-1 backdrop-blur-md" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ backgroundColor: color }}>
        <Icon size={12} className="text-white" strokeWidth={3} />
      </div>
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-black/5">
        <motion.div
          className="h-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function CurrencyBadge({ icon: Icon, value, color }: { icon: React.ElementType; value: string; color: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-md" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      <Icon size={14} style={{ color }} fill={color} />
      <span className="text-[11px] font-black text-text-primary">{value}</span>
      <div className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black/5">
        <Plus size={10} className="text-text-secondary" />
      </div>
    </div>
  );
}

function FloatingActionBtn({
  icon: Icon,
  bg,
  iconColor = "white",
  size = 44,
  onClick,
  label,
}: {
  icon: React.ElementType;
  bg: string;
  iconColor?: string;
  size?: number;
  onClick?: () => void;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: size,
          height: size,
          background: bg,
          boxShadow: "0 6px 16px rgba(0,0,0,0.12), inset 0 -2px 0 rgba(0,0,0,0.1)",
        }}
        className="flex items-center justify-center rounded-2xl border-2 border-white/50 transition-opacity hover:opacity-90"
      >
        <Icon size={size * 0.45} color={iconColor} strokeWidth={2.5} />
      </motion.button>
      {label && <span className="text-[9px] font-bold uppercase tracking-wider text-text-primary drop-shadow-sm">{label}</span>}
    </div>
  );
}

export default function HomePage() {
  const [snapIndex, setSnapIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [tried, setTried] = useState(false);

  const handleSheetDragEnd = (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
    if (info.offset.y < -50 || info.velocity.y < -300) {
      setSnapIndex((s) => Math.min(s + 1, 2));
    } else if (info.offset.y > 50 || info.velocity.y > 300) {
      setSnapIndex((s) => Math.max(s - 1, 0));
    }
  };

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: "100dvh", background: "linear-gradient(to bottom, #dbeafe, #f8fafc)" }}
    >
      {/* Game Header: Status and Currency */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-4 pt-6">
        {/* Status Indicators */}
        <div className="flex flex-col gap-2">
          <StatusBar icon={Sparkles} value={85} color="var(--primary)" />
          <StatusBar icon={Zap} value={60} color="#f59e0b" />
          <StatusBar icon={Users} value={40} color="#10b981" />
        </div>

        {/* Currency Display */}
        <div className="flex flex-col items-end gap-2">
          <CurrencyBadge icon={Coins} value="1,250" color="#f59e0b" />
          <CurrencyBadge icon={Gem} value="12" color="#8b5cf6" />
        </div>
      </div>
      {/* Avatar background */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {tried ? (
            <motion.img
              key="3dfullv4"
              src="/images/3dfullv4.png"
              alt="3D Avatar V4"
              className="absolute inset-0 h-full w-full object-cover object-top"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4 }}
            />
          ) : snapIndex === 0 ? (
            <motion.img
              key="3dfull"
              src="/images/3dfullv1.png"
              alt="3D Avatar Full"
              className="absolute inset-0 h-full w-full object-cover object-top"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.img
              key="sumary3d"
              src="/images/sumary3d.png"
              alt="3D Avatar Summary"
              className="absolute inset-0 h-full w-full object-cover object-top"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Right-side floating actions */}
      <AnimatePresence>
        {snapIndex === 0 && (
          <motion.div
            className="absolute right-4 top-40 z-10 flex flex-col gap-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <FloatingActionBtn 
              icon={Shirt} 
              bg="#3b82f6" 
              label="Tủ đồ" 
              onClick={() => setSnapIndex(1)}
              size={52}
            />
            <FloatingActionBtn icon={MessageCircle} bg="var(--primary)" size={52} />
            <Link href="/upload">
              <FloatingActionBtn icon={Plus} bg="var(--secondary)" label="Mới" />
            </Link>
            <Link href="/share-look">
              <FloatingActionBtn icon={Share2} bg="white" iconColor="#0f172a" label="Chia sẻ" />
            </Link>
            <FloatingActionBtn icon={Star} bg="white" iconColor="#0f172a" label="Sưu tầm" />
            <Link href="/ai-fit-analysis/result">
              <FloatingActionBtn icon={HelpCircle} bg="white" iconColor="#0f172a" label="Trợ giúp" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Try now button */}
      <AnimatePresence>
        {selectedItems.length === 2 && !tried && activeCategory !== 3 && (
          <motion.div
            className="absolute inset-x-0 z-10 flex justify-center"
            style={{ bottom: snapIndex === 0 ? "130px" : `calc(${SNAP_HEIGHTS[snapIndex]} + 24px)` }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            <button
              onClick={() => setTried(true)}
              className="rounded-full px-8 py-3 text-sm font-bold text-white"
              style={{ background: "var(--primary)", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}
            >
              ✨ Thử ngay
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom-right swap/delete actions */}
      <AnimatePresence>
        {snapIndex === 0 && (
          <motion.div
            className="absolute right-5 z-20 flex flex-col gap-3"
            style={{ bottom: "135px" }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {activeCategory === 3 && selectedItems.length === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link href="/outfit-duel">
                  <FloatingActionBtn icon={ArrowLeftRight} bg="var(--primary)" />
                </Link>
              </motion.div>
            )}
            <FloatingActionBtn icon={Trash2} bg="#ef4444" size={48} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Draggable Bottom Sheet */}
      <motion.div
        className="absolute inset-x-0 bottom-0 overflow-hidden bg-white"
        style={{ borderRadius: "40px 40px 0 0", boxShadow: "0 -10px 40px rgba(0,0,0,0.08)" }}
        animate={{ height: SNAP_HEIGHTS[snapIndex] }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.1, bottom: 0.1 }}
        onDragEnd={handleSheetDragEnd}
      >
        {/* Drag handle */}
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex flex-1 justify-center">
            <div className="h-1.5 w-12 rounded-full bg-[#E2E8F0] cursor-grab" />
          </div>
          <button 
            onClick={() => setSnapIndex(0)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-text-secondary"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        <div className="h-[calc(100%-32px)] overflow-y-auto">
          {/* Filter pills */}
          <div className="flex gap-2 overflow-x-auto px-6 pb-2">
            {/* Active filter chip */}
            <div
              className="flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold"
              style={{
                background: "color-mix(in srgb, var(--primary) 10%, transparent)",
                borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
                color: "var(--primary)",
              }}
            >
              <ListFilter size={14} />
              Bộ lọc
              <ChevronDown size={12} />
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-full border border-border-light bg-background px-4 py-2 text-xs font-medium text-text-secondary">
              <Shirt size={14} />
              Cotton Tee
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-full border border-border-light bg-background px-4 py-2 text-xs font-medium text-text-secondary">
              Slim Jeans
            </div>
          </div>

          {/* Category tabs */}
          <div className="mt-4 px-6">
            <div className="flex border-b border-background">
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(i)}
                  className={cn(
                    "pb-3 mr-4 text-sm transition-colors",
                    i === activeCategory
                       ? "border-b-2 border-(--secondary) font-bold text-(--secondary)"
                       : "font-normal text-text-tertiary"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Clothing grid */}
          <div className="grid grid-cols-3 gap-3 px-6 pb-8 pt-6">
            <AnimatePresence>
              {(activeCategory === 3 ? OUTFIT_ITEMS : CLOTHING_ITEMS).map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setSelectedItems((prev) =>
                      prev.includes(item.id)
                        ? prev.filter((id) => id !== item.id)
                        : [...prev, item.id]
                    );
                    setTried(false);
                  }}
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div
                    className="relative w-full overflow-hidden rounded-2xl bg-[#F1F5F9]"
                    style={{
                      aspectRatio: "0.75",
                      border: selectedItems.includes(item.id) ? "2px solid var(--primary)" : "none",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                    {selectedItems.includes(item.id) && (
                      <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-(--primary)">
                        <Check size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[10px]",
                      selectedItems.includes(item.id)
                        ? "font-bold text-text-primary"
                        : "font-medium text-text-secondary"
                    )}
                  >
                    {item.title}
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>

            {/* Add more button */}
            <Link href="/upload" className="flex flex-col items-center gap-2">
              <div
                className="flex w-full items-center justify-center rounded-2xl border-2 border-border-light bg-[#F8FAFC]"
                style={{ aspectRatio: "0.75" }}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E2E8F0]">
                  <Plus size={14} className="text-text-tertiary" />
                </div>
              </div>
              <span className="text-[10px] font-medium text-text-tertiary">Thêm</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
