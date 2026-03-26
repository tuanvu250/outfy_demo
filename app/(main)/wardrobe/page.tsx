"use client";

import React, { useState } from "react";
import { 
  Search, Plus, Bell, Bookmark, Heart, MessageCircle, 
  Share2, Star, AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const MOCK_POSTS = [
  {
    id: 1,
    user: {
      name: "user10152334682",
      avatar: "https://i.pravatar.cc/150?u=user10152334682",
      followers: "77 followers",
      level: "Level 23",
      isFollowing: false,
    },
    image: "/images/male_3d_outfit_1.png",
    items: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=200&auto=format&fit=crop",
    ],
    likes: 131,
    comments: 0,
    saves: 9,
    shares: 0,
    rating: 3.9,
    title: "Casual Streetwear",
    caption: "Perfect for a day out in the city. #streetstyle #3dfashion",
    time: "1 hour ago"
  },
  {
    id: 2,
    user: {
      name: "fashion_guru",
      avatar: "https://i.pravatar.cc/150?u=fashion_guru",
      followers: "1.2k followers",
      level: "Level 45",
      isFollowing: true,
    },
    image: "/images/female_3d_outfit_1.png",
    items: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=200&auto=format&fit=crop",
    ],
    likes: 842,
    comments: 24,
    saves: 56,
    shares: 12,
    rating: 4.8,
    title: "Spring Vibes",
    caption: "Feeling the breeze with this linen set #springstyle",
    time: "3 hours ago"
  }
];

function PostCard({ post }: { post: typeof MOCK_POSTS[0] }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="mb-10 flex flex-col bg-white">
      {/* Post Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-gray-100 shadow-sm">
        <img 
          src={post.image} 
          alt={post.title} 
          className="h-full w-full object-cover"
        />

        {/* Side Thumbnails (Left) */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {post.items.map((item, idx) => (
            <motion.div 
              key={idx}
              className="h-14 w-14 rounded-xl border-2 border-white/40 bg-white/20 p-0.5 backdrop-blur-sm shadow-lg overflow-hidden"
              whileHover={{ scale: 1.1, x: 5 }}
            >
              <img src={item} alt="item" className="h-full w-full rounded-lg object-cover" />
            </motion.div>
          ))}
        </div>

        {/* Action Sidebar (Right) */}
        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-4">
          <div className="flex flex-col items-center">
            <button 
              onClick={() => setLiked(!liked)}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-colors",
                liked ? "text-red-500" : "text-white"
              )}
            >
              <Heart size={26} fill={liked ? "currentColor" : "none"} />
            </button>
            <span className="mt-1 text-xs font-bold text-white shadow-sm">{post.likes + (liked ? 1 : 0)}</span>
          </div>

          <div className="flex flex-col items-center">
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white">
              <MessageCircle size={26} />
            </button>
            <span className="mt-1 text-xs font-bold text-white shadow-sm">{post.comments}</span>
          </div>

          <div className="flex flex-col items-center">
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white">
              <Bookmark size={26} />
            </button>
            <span className="mt-1 text-xs font-bold text-white shadow-sm">{post.saves}</span>
          </div>

          <div className="flex flex-col items-center">
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white">
              <Share2 size={26} />
            </button>
            <span className="mt-1 text-xs font-bold text-white shadow-sm">{post.shares}</span>
          </div>

          <button className="flex h-12 w-12 flex-col items-center justify-center text-white/80">
            <AlertTriangle size={24} />
            <span className="mt-0.5 text-[10px] uppercase font-bold tracking-wider">Report</span>
          </button>
        </div>

        {/* Bottom Info Overlay */}
        <div className="absolute bottom-6 left-6 right-16">
          <div className="flex items-center gap-1.5 mb-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star 
                key={s} 
                size={16} 
                className={cn(s <= Math.floor(post.rating) ? "text-yellow-400 fill-yellow-400" : "text-white/40")} 
              />
            ))}
            <span className="ml-1 text-sm font-bold text-white">{post.rating}/5</span>
          </div>
          <h3 className="text-lg font-bold text-white leading-tight drop-shadow-md">{post.title}</h3>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
           <div className="h-1 w-8 rounded-full bg-white/30" />
        </div>
      </div>

      {/* User Info & Caption (Below Image) */}
      <div className="px-2 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={post.user.avatar} 
                alt={post.user.name} 
                className="h-11 w-11 rounded-full border-2 border-primary object-cover" 
              />
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white border-2 border-white">
                <Plus size={12} strokeWidth={3} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base">@{post.user.name}</span>
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                  {post.user.followers}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-tertiary">
                <span>{post.time}</span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span className="font-semibold text-primary">{post.user.level}</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">
          {post.caption}
        </p>
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"for-you" | "following">("for-you");

  return (
    <div className="flex min-h-screen flex-col bg-white pb-32">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg px-5 py-4">
        <div className="flex items-center justify-between">
          <button className="text-text-primary">
            <Bookmark size={24} />
          </button>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTab("for-you")}
              className="relative py-1"
            >
              <span className={cn(
                "text-base font-bold transition-colors",
                activeTab === "for-you" ? "text-text-primary" : "text-text-tertiary"
              )}>
                For you
              </span>
              {activeTab === "for-you" && (
                <motion.div 
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-text-primary" 
                />
              )}
            </button>
            <button 
              onClick={() => setActiveTab("following")}
              className="relative py-1"
            >
              <span className={cn(
                "text-base font-bold transition-colors",
                activeTab === "following" ? "text-text-primary" : "text-text-tertiary"
              )}>
                Following
              </span>
              {activeTab === "following" && (
                <motion.div 
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-text-primary" 
                />
              )}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Plus size={24} className="text-text-primary" />
            <Search size={24} className="text-text-primary" />
            <Bell size={24} className="text-text-primary" />
          </div>
        </div>
      </header>

      {/* Feed Content */}
      <main className="flex-1 px-4 pt-2">
        <div className="mx-auto max-w-lg">
          {MOCK_POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
