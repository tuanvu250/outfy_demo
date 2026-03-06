import { Header } from "@/components/layout/Header";
import { Share2, Download, Instagram, Twitter } from "lucide-react";

export default function ShareLookPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Share Look" showBack />
      <div className="flex flex-col items-center p-4 gap-4">
        {/* Preview */}
        <div className="w-full max-w-xs rounded-3xl bg-gradient-to-b from-purple-100 to-pink-50 h-72 flex items-center justify-center border border-[var(--border-light)]">
          <p className="text-[var(--text-tertiary)] text-sm">Preview outfit</p>
        </div>

        {/* Backgrounds */}
        <div className="w-full max-w-xs">
          <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">Nền</p>
          <div className="flex gap-2">
            {["#f1f5f9", "#fef3c7", "#ede9fe", "#fce7f3", "#000000"].map((bg) => (
              <button
                key={bg}
                className="w-9 h-9 rounded-full border-2 border-[var(--border-light)] hover:scale-110 transition-transform"
                style={{ backgroundColor: bg }}
              />
            ))}
          </div>
        </div>

        {/* Caption */}
        <div className="w-full max-w-xs">
          <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">Caption</p>
          <textarea
            rows={3}
            placeholder="OOTD vibes ✨ #Outfy"
            className="w-full rounded-2xl border border-[var(--border-light)] bg-[var(--surface)] px-4 py-3 text-sm outline-none resize-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </div>

        {/* Share Buttons */}
        <div className="flex gap-3 w-full max-w-xs">
          <button className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-pink-500 text-white py-3 text-sm font-medium hover:opacity-90">
            <Instagram size={16} /> Instagram
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-sky-400 text-white py-3 text-sm font-medium hover:opacity-90">
            <Twitter size={16} /> Twitter
          </button>
          <button className="flex-shrink-0 flex items-center justify-center rounded-2xl border border-[var(--border-light)] bg-[var(--surface)] w-12 h-12 hover:bg-[var(--background)] transition-colors">
            <Download size={18} className="text-[var(--text-secondary)]" />
          </button>
        </div>
      </div>
    </div>
  );
}
