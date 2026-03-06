"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle, ChevronRight, Plus, Mic, SendHorizontal,
  Sparkles, Settings, Shirt, ArrowLeft,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OutfitSuggestion {
  id: number;
  name: string;
  items: string[];
  occasion: string;
  color: string;
}

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
  outfits?: OutfitSuggestion[];
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const PROMPT_CARDS = [
  {
    Icon: Shirt,
    title: "Gợi ý outfit theo phong cách",
    subtitle: "Tìm trang phục phù hợp với vóc dáng và sở thích của bạn",
    prompt: "Gợi ý outfit theo phong cách của tôi",
  },
  {
    Icon: Settings,
    title: "Phân tích tủ đồ hiện tại",
    subtitle: "AI sẽ đánh giá và đề xuất cách phối đồ từ tủ của bạn",
    prompt: "Phân tích tủ đồ của tôi và gợi ý cách phối đồ",
  },
];

const SUGGESTION_CHIPS = ["Đi làm công sở", "Dự tiệc tối", "Đi cà phê", "Đi biển"];

const MOCK_OUTFITS: OutfitSuggestion[] = [
  {
    id: 1,
    name: "Công sở thanh lịch",
    items: ["Áo sơ mi trắng", "Quần tây đen", "Giày oxford nâu"],
    occasion: "Đi làm",
    color: "#307B75",
  },
  {
    id: 2,
    name: "Casual cuối tuần",
    items: ["Áo thun basic xám", "Quần jeans slim", "Sneakers trắng"],
    occasion: "Đi chơi",
    color: "#6366F1",
  },
  {
    id: 3,
    name: "Tiệc tối sang trọng",
    items: ["Đầm cocktail navy", "Heels nude", "Túi clutch vàng"],
    occasion: "Dự tiệc",
    color: "#EC4899",
  },
  {
    id: 4,
    name: "Đi biển năng động",
    items: ["Áo croptop san hô", "Quần short linen trắng", "Sandals đế bằng"],
    occasion: "Đi biển",
    color: "#F97316",
  },
];

const INITIAL_AI_MESSAGE: Message = {
  id: 0,
  role: "ai",
  text: "Xin chào! Tôi là AI Stylist của Outfy. Bạn muốn mặc gì hôm nay? Hãy cho tôi biết hoàn cảnh (đi làm, dự tiệc, đi chơi...) và tôi sẽ gợi ý outfit phù hợp!",
};

function getMockResponse(userText: string): { text: string; outfits?: OutfitSuggestion[] } {
  const t = userText.toLowerCase();
  if (t.includes("tủ đồ") || t.includes("phân tích")) {
    return {
      text: "Tôi đã phân tích tủ đồ của bạn! Bạn có 12 items chưa được phối đồ tối ưu. Dưới đây là một số gợi ý kết hợp thú vị từ những món đồ bạn đang có:",
      outfits: [MOCK_OUTFITS[0], MOCK_OUTFITS[1], MOCK_OUTFITS[2]],
    };
  }
  if (t.includes("tiệc") || t.includes("tối") || t.includes("party")) {
    return {
      text: "Cho buổi tối đặc biệt, đây là lựa chọn sẽ giúp bạn tỏa sáng và tự tin:",
      outfits: [MOCK_OUTFITS[2]],
    };
  }
  if (t.includes("biển") || t.includes("du lịch")) {
    return {
      text: "Phong cách đi biển vừa tươi mát vừa thời thượng — đây là gợi ý cho bạn:",
      outfits: [MOCK_OUTFITS[3]],
    };
  }
  if (t.includes("cà phê") || t.includes("cafe") || t.includes("đi chơi")) {
    return {
      text: "Casual chic cho buổi cà phê hay đi dạo cuối tuần:",
      outfits: [MOCK_OUTFITS[1]],
    };
  }
  if (t.includes("công sở") || t.includes("đi làm") || t.includes("phong cách")) {
    return {
      text: "Dựa trên phong cách và vóc dáng của bạn, tôi gợi ý những outfit vừa lịch sự vừa thoải mái:",
      outfits: [MOCK_OUTFITS[0], MOCK_OUTFITS[1]],
    };
  }
  return {
    text: "Cảm ơn bạn đã hỏi! Để gợi ý outfit chính xác hơn, bạn có thể cho tôi biết dịp sử dụng và phong cách bạn yêu thích không? Ví dụ: đi làm, dự tiệc, đi cà phê, đi biển...",
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AiStylistPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_AI_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatStarted) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, chatStarted]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    setChatStarted(true);
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text: text.trim() }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const { text: aiText, outfits } = getMockResponse(text);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "ai", text: aiText, outfits },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleReset = () => {
    setChatStarted(false);
    setMessages([INITIAL_AI_MESSAGE]);
    setInput("");
  };

  return (
    <div className="relative flex h-screen flex-col bg-white overflow-hidden">
      {/* Gradient bg (empty state only) */}
      {!chatStarted && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(48,123,117,0.15) 0%, rgba(48,123,117,0.05) 40%, transparent 70%)",
          }}
        />
      )}

      {/* Header */}
      <div
        className="relative z-10 flex items-center justify-between px-5 py-4"
        style={chatStarted ? { borderBottom: "1px solid rgba(0,0,0,0.06)" } : {}}
      >
        {chatStarted ? (
          <button
            onClick={handleReset}
            className="flex h-10 w-10 items-center justify-center rounded-full"
          >
            <ArrowLeft size={20} className="text-[var(--text-primary)]" />
          </button>
        ) : (
          <div className="h-10 w-10" />
        )}
        <h1 className="text-lg font-bold tracking-[-0.45px] text-[var(--text-primary)]">
          AI Stylist
        </h1>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-white"
          style={{ background: "#307B75", boxShadow: "0 4px 4px rgba(0,0,0,0.3)" }}
        >
          <MessageCircle size={18} />
        </button>
      </div>

      {/* ── EMPTY STATE ── */}
      {!chatStarted && (
        <div className="relative flex-1 overflow-y-auto pb-[180px]">
          <div className="mt-8 flex flex-col items-center px-5">
            <div
              className="flex h-[88px] w-[88px] items-center justify-center rounded-full"
              style={{ background: "rgba(48,123,117,0.1)" }}
            >
              <Sparkles size={40} className="text-[var(--primary)]" />
            </div>
            <p
              className="mt-6 text-center text-xl font-bold text-[var(--text-secondary)]"
              style={{ letterSpacing: "-0.5px", lineHeight: 1.3 }}
            >
              Xin chào! Tôi có thể<br />giúp gì cho bạn?
            </p>
          </div>

          <div className="mt-12 space-y-4 px-5">
            {PROMPT_CARDS.map(({ Icon, title, subtitle, prompt }) => (
              <button
                key={title}
                onClick={() => sendMessage(prompt)}
                className="flex w-full items-center gap-4 rounded-2xl bg-white p-4 text-left transition-shadow hover:shadow-md active:scale-[0.99]"
                style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.08)" }}
              >
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(48,123,117,0.1)" }}
                >
                  <Icon size={24} className="text-[var(--primary)]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{title}</p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">{subtitle}</p>
                </div>
                <ChevronRight size={18} className="flex-shrink-0 text-[var(--text-tertiary)]" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── CHAT STATE ── */}
      {chatStarted && (
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-[200px] space-y-4">
          {messages.map((msg) =>
            msg.role === "ai" ? (
              <div key={msg.id} className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "#307B75" }}
                >
                  <Sparkles size={14} className="text-white" />
                </div>
                <div className="max-w-[82%] space-y-2">
                  <div className="rounded-2xl rounded-tl-none px-4 py-3" style={{ background: "#F3F4F6" }}>
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">{msg.text}</p>
                  </div>
                  {msg.outfits?.map((outfit) => (
                    <div
                      key={outfit.id}
                      className="rounded-2xl bg-white border border-gray-100 p-3"
                      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: outfit.color }} />
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{outfit.name}</p>
                        <span
                          className="ml-auto text-[10px] px-2 py-0.5 rounded-full text-white font-medium"
                          style={{ background: outfit.color }}
                        >
                          {outfit.occasion}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {outfit.items.map((item) => (
                          <span
                            key={item}
                            className="text-xs px-2 py-1 rounded-full bg-gray-100 text-[var(--text-secondary)]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  {msg.id === 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {SUGGESTION_CHIPS.map((chip) => (
                        <button
                          key={chip}
                          onClick={() => sendMessage(chip)}
                          className="rounded-full border px-3 py-1 text-xs transition-opacity hover:opacity-70"
                          style={{ borderColor: "rgba(48,123,117,0.45)", color: "#307B75" }}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex justify-end">
                <div
                  className="max-w-[75%] rounded-2xl rounded-tr-none px-4 py-3 text-white"
                  style={{ background: "#307B75" }}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            )
          )}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#307B75" }}
              >
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="rounded-2xl rounded-tl-none px-4 py-3" style={{ background: "#F3F4F6" }}>
                <div className="flex gap-1 items-center h-5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ background: "#307B75", animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* ── Input area ── */}
      <div
        className="absolute inset-x-0 bg-white/90 px-5 py-3 backdrop-blur-sm"
        style={{ bottom: "110px" }}
      >
        {chatStarted && !isTyping && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {SUGGESTION_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => sendMessage(chip)}
                className="flex-shrink-0 rounded-full border px-3 py-1 text-xs transition-opacity hover:opacity-70"
                style={{ borderColor: "rgba(48,123,117,0.45)", color: "#307B75" }}
              >
                {chip}
              </button>
            ))}
          </div>
        )}
        <div
          className="flex items-center gap-2 rounded-full border bg-white px-4 py-3"
          style={{ borderColor: "#307B75" }}
        >
          <Plus size={22} className="flex-shrink-0 text-[var(--text-tertiary)]" />
          <div className="h-5 w-px flex-shrink-0" style={{ background: "#307B75" }} />
          <input
            className="flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[#6B7280]"
            placeholder="Hỏi AI Stylist..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          />
          <Mic size={22} className="flex-shrink-0 text-[var(--text-tertiary)]" />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-white disabled:opacity-40 transition-opacity"
            style={{ background: "#307B75", boxShadow: "0 2px 6px rgba(48,123,117,0.2)" }}
          >
            <SendHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

