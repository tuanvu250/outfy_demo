// ============================================
// Try-On Pipeline Types
// ============================================

export type TryOnStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export type AvatarId =
  | "slim_male"
  | "slim_female"
  | "regular_male"
  | "regular_female"
  | "athletic_male"
  | "curvy_female";

export type GarmentCategory =
  | "HOODIE"
  | "T-SHIRT"
  | "FEMALE_TSHIRT"
  | "SHIRT"
  | "JACKET"
  | "PANTS"
  | "SHORTS"
  | "DRESS"
  | "SKIRT"
  | "SHORT_SKIRT"
  | "CROP_TOP";

export type Size = "XS" | "S" | "M" | "L" | "XL";

export type FitType = "slim" | "regular" | "loose" | "oversize";

// ============================================
// Request Types
// ============================================

export interface CreateTryOnFromClothingRequest {
  userId: number;
  bodyProfileId: number;
  clothingItemId: number;
}

export interface CreateTryOnFromWardrobeRequest {
  userId: number;
  wardrobeItemId: number;
  avatarId: AvatarId;
  size?: Size;
  fitType?: FitType;
}

export interface UpdateTryOnRequest {
  size?: Size;
  fitType?: FitType;
  sleeveLength?: string;
  avatarId?: AvatarId;
}

// ============================================
// Quick Try-On Types
// ============================================

export interface QuickTryOnRequest {
  userId: number;
  gender: string;
  bodyType: string;
  wardrobeItemIds: number[];
  size?: Size;
  fitType?: FitType;
}

export interface QuickTryOnResponse {
  modelUrl: string;
  modelFileName: string;
  bodyType: string;
  gender: string;
  clothingCategories: string[];
  fitScore: number;
  message: string;
}

// ============================================
// Response Types
// ============================================

export interface TryOnSession {
  id: number;
  userId: number;
  bodyProfileId?: number;
  clothingItemId?: number;
  wardrobeItemId?: number;
  avatarId: AvatarId;
  garmentCategory?: GarmentCategory;
  garmentColor?: string;
  requestedSize?: Size;
  fitType?: FitType;
  status: TryOnStatus;
  isFavorite?: boolean;
  createdAt: string;
}

export interface TryOnAppliedParams {
  scale: number;
  offsetX: number;
  offsetY: number;
  size: Size;
  fitType: FitType;
  garmentModelUrl: string;
  garmentCategory: GarmentCategory;
  garmentColor: string;
  bodyModelUrl: string;
  bodyType: AvatarId;
}

export interface TryOnResult {
  id: number;
  sessionId: number;
  previewUrl: string;
  fitScore: number;
  note: string;
  avatarId: AvatarId;
  avatarUrl: string;
  garmentCategory: GarmentCategory;
  garmentColor: string;
  isFavorite: boolean;
  createdAt: string;
  appliedParams?: TryOnAppliedParams;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ============================================
// Constants
// ============================================

export const AVATAR_OPTIONS: {
  id: AvatarId;
  label: string;
  description: string;
}[] = [
  { id: "slim_male", label: "Slim Male", description: "Slim body type - male" },
  {
    id: "slim_female",
    label: "Slim Female",
    description: "Slim body type - female",
  },
  {
    id: "regular_male",
    label: "Regular Male",
    description: "Regular body type - male",
  },
  {
    id: "regular_female",
    label: "Regular Female",
    description: "Regular body type - female",
  },
  {
    id: "athletic_male",
    label: "Athletic Male",
    description: "Athletic/broad body type - male",
  },
  {
    id: "curvy_female",
    label: "Curvy Female",
    description: "Curvy body type - female",
  },
];

export const SIZE_OPTIONS: { value: Size; label: string }[] = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
];

export const FIT_TYPE_OPTIONS: { value: FitType; label: string }[] = [
  { value: "slim", label: "Slim Fit" },
  { value: "regular", label: "Regular Fit" },
  { value: "loose", label: "Loose Fit" },
  { value: "oversize", label: "Oversize" },
];

// Local storage key
export const TRYON_RESULT_KEY = "outfy_tryon_result";
