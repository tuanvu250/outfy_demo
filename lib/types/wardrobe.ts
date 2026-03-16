export type ClothingCategory =
  | "tops"
  | "bottoms"
  | "shoes"
  | "outfits"
  | "hats"
  | "accessories";

export interface ClothingItem {
  id: string;
  name: string;
  imageUrl: string;
  category: ClothingCategory;
  colors: string[];
  material?: string;
  brand?: string;
  size?: string;
  isFavorite: boolean;
  createdAt: string;
  // 3D Model
  modelUrl?: string;
}

export interface Outfit {
  id: string;
  name: string;
  items: ClothingItem[];
  previewImageUrl?: string;
  createdAt: string;
}

export interface WardrobeFilter {
  category?: ClothingCategory;
  color?: string;
  brand?: string;
}
