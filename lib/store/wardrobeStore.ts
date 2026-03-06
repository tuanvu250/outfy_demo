import { create } from "zustand";
import type { ClothingItem, ClothingCategory, WardrobeFilter } from "@/lib/types/wardrobe";

interface WardrobeStore {
  clothingItems: ClothingItem[];
  selectedItem: ClothingItem | null;
  activeCategory: ClothingCategory;
  isAvatarExpanded: boolean;
  filters: WardrobeFilter;
  setClothingItems: (items: ClothingItem[]) => void;
  setSelectedItem: (item: ClothingItem | null) => void;
  setActiveCategory: (category: ClothingCategory) => void;
  toggleAvatarExpanded: () => void;
  setFilters: (filters: WardrobeFilter) => void;
  addItem: (item: ClothingItem) => void;
  removeItem: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const useWardrobeStore = create<WardrobeStore>((set) => ({
  clothingItems: [],
  selectedItem: null,
  activeCategory: "tops",
  isAvatarExpanded: false,
  filters: {},
  setClothingItems: (items) => set({ clothingItems: items }),
  setSelectedItem: (item) => set({ selectedItem: item }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  toggleAvatarExpanded: () =>
    set((state) => ({ isAvatarExpanded: !state.isAvatarExpanded })),
  setFilters: (filters) => set({ filters }),
  addItem: (item) =>
    set((state) => ({ clothingItems: [...state.clothingItems, item] })),
  removeItem: (id) =>
    set((state) => ({
      clothingItems: state.clothingItems.filter((i) => i.id !== id),
    })),
  toggleFavorite: (id) =>
    set((state) => ({
      clothingItems: state.clothingItems.map((i) =>
        i.id === id ? { ...i, isFavorite: !i.isFavorite } : i
      ),
    })),
}));
