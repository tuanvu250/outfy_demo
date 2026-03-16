// ============================================
// AI 3D Cloth Pipeline Types
// ============================================

export interface AnalyzeClothingRequest {
  imageUrl: string;
  fileName?: string;
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
  | 'TSHIRT'
  | 'HOODIE'
  | 'SHIRT'
  | 'PANTS'
  | 'SKIRT'
  | 'DRESS'
  | 'JACKET';

export interface ClothingAnalysisResult {
  garmentCategory: GarmentCategory;
  templateCode: string;
  attributes: ClothingAttributes;
  garmentParameters: GarmentParameters;
  previewUrl: string;
  confidence: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Local storage key
export const CLOTH_RESULT_KEY = 'outfy_cloth_result';

