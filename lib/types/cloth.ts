// ============================================
// AI 3D Cloth Pipeline Types
// ============================================

export interface AnalyzeClothingRequest {
  userId: number;
  imageUrl: string;
  fileName?: string;
  name?: string;
}

export interface ClothingAttributes {
  color?: string;
  sleeveType?: string;
  fitType?: string;
  hasHood?: boolean;
  hasZipper?: boolean;
  [key: string]: string | boolean | number | undefined;
}

export interface GarmentParameters {
  chestWidth?: number;
  bodyLength?: number;
  sleeveLength?: number;
  waistWidth?: number;
  inseamLength?: number;
  [key: string]: number | undefined;
}

export type GarmentCategory =
  | "TSHIRT"
  | "HOODIE"
  | "SHIRT"
  | "PANTS"
  | "SHORTS"
  | "SKIRT"
  | "SHORT_SKIRT"
  | "DRESS"
  | "JACKET"
  | "CLOTH_TOP"
  | "FEMALE_SHIRT";

export interface ClothingAnalysisResult {
  clothingItemId: number;
  garmentCategory: GarmentCategory;
  templateCode: string;
  attributes: ClothingAttributes;
  garmentParameters: GarmentParameters;
  previewUrl: string;
  modelUrl: string;
  confidence: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Local storage key
export const CLOTH_RESULT_KEY = "outfy_cloth_result";

// ============================================
// Wardrobe Types
// ============================================

export type Season = "SPRING" | "SUMMER" | "FALL" | "WINTER";

export interface AddToWardrobeRequest {
  clothingItemId: number;
  userId: number;
  season?: Season;
  notes?: string;
}

export interface WardrobeItem {
  id: number;
  userId: number;
  clothingItemId: number;
  name?: string;
  category: string;
  garmentCategory?: string;
  season: Season;
  color: string;
  isFavorite: boolean;
  notes: string;
  imageUrl: string;
  previewUrl?: string;
  modelUrl?: string; // 3D model URL for viewer
  createdAt: string;
  updatedAt: string;
}

export interface UpdateWardrobeRequest {
  category?: string;
  season?: Season;
  color?: string;
  notes?: string;
}

// ============================================
// Draft Types
// ============================================

export type DraftType = "CLOTH" | "BODY";

export type DraftStatus = "DRAFT" | "ANALYZING" | "ANALYZED";

export interface CreateDraftRequest {
  userId: number;
  draftType: DraftType;
  name?: string;
  imageUrl: string;
  fileName?: string;
}

export interface Draft {
  id: number;
  userId: number;
  draftType: DraftType;
  name: string;
  imageUrl: string;
  fileName: string;
  status: DraftStatus;
  garmentCategory: string | null;
  templateCode: string | null;
  previewUrl: string | null;
  color: string | null;
  analysisResultJson: string | null;
  createdAt: string;
  updatedAt: string;
}
