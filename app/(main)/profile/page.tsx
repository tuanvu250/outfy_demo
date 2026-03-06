import { User, Camera, LogOut, ChevronRight, Settings, Lock, Globe } from "lucide-react";
import Link from "next/link";

const STATS = [
  { label: "Trang phục", value: "0" },
  { label: "Outfits", value: "0" },
  { label: "Yêu thích", value: "0" },
];

const SECTIONS = [
  {
    title: "Thông tin cá nhân",
    items: [
      { label: "Họ và tên", value: "Nguyen Van A" },
      { label: "Email", value: "user@outfy.vn" },
      { label: "Điện thoại", value: "Chưa cập nhật" },
    ],
  },
  {
    title: "Hồ sơ vóc dáng",
    items: [
      { label: "Chiều cao", value: "Chưa cập nhật" },
      { label: "Cân nặng", value: "Chưa cập nhật" },
    ],
  },
  {
    title: "Tuỳ chọn",
    items: [
      { label: "Ngôn ngữ", value: "Tiếng Việt" },
      { label: "Thông báo", value: "Bật" },
    ],
  },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
        {/* Language pill */}
        <div className="rounded-full border border-[var(--border-light)] bg-[var(--background)] px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)]">
          🇻🇳 VI
        </div>
        {/* Message button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-white"
          style={{
            background: "#307B75",
            boxShadow: "0 4px 4px rgba(0,0,0,0.3)",
          }}
        >
          <Settings size={18} />
        </button>
      </div>

      {/* Avatar */}
      <div className="mt-4 flex flex-col items-center">
        <div className="relative">
          {/* Outer teal ring */}
          <div
            className="flex items-center justify-center rounded-full p-1"
            style={{
              width: 128,
              height: 128,
              background: "#307B75",
              boxShadow: "0 0 15px rgba(48,123,117,0.4)",
            }}
          >
            {/* White inner circle */}
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white">
              <User size={72} className="text-gray-300" />
            </div>
          </div>
          {/* Camera button */}
          <button
            className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full text-white"
            style={{
              background: "#307B75",
              border: "4px solid #FD7123",
            }}
          >
            <Camera size={16} />
          </button>
        </div>

        {/* Name */}
        <h2 className="mt-4 text-2xl font-bold tracking-[-0.5px] text-[var(--text-primary)]">
          Nguyen Van A
        </h2>
      </div>

      {/* Stats cards */}
      <div className="mt-8 flex justify-center gap-3 px-4">
        {STATS.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-white py-5"
            style={{
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <span
              className="text-4xl font-bold"
              style={{ color: "#307B75", lineHeight: 1 }}
            >
              {value}
            </span>
            <span className="mt-1 text-[13px] text-[var(--text-tertiary)]">{label}</span>
          </div>
        ))}
      </div>

      {/* Info sections */}
      {SECTIONS.map(({ title, items }) => (
        <div key={title} className="mt-8 px-4">
          <h3 className="mb-3 text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            {title}
          </h3>
          <div className="overflow-hidden rounded-2xl border border-[var(--border-light)] bg-white">
            {items.map(({ label, value }, i) => (
              <div
                key={label}
                className={cn(
                  "flex items-center justify-between px-4 py-3",
                  i < items.length - 1 ? "border-b border-[var(--border-light)]" : ""
                )}
              >
                <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
                <div className="flex items-center gap-2 text-[var(--text-tertiary)]">
                  <span className="text-sm">{value}</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Sign out */}
      <div className="mt-8 px-4">
        <button className="flex w-full items-center justify-center gap-2 py-2">
          <LogOut size={16} className="text-red-500" />
          <span className="text-sm font-bold text-red-500">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

