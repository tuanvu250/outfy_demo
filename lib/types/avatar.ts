export type Gender = "male" | "female" | "non-binary";

export interface BodyMeasurements {
  height: number; // cm
  weight: number; // kg
  chest: number; // cm
  waist: number; // cm
  hips: number; // cm
}

export interface Avatar {
  id: string;
  gender: Gender;
  measurements: BodyMeasurements;
  modelUrl?: string;
  previewImageUrl?: string;
  createdAt: string;
}

export interface AvatarSetupData {
  gender: Gender;
  style?: string;
}

// ============================================
// Body Profile & Avatar Generation Types
// ============================================

export type GenderApi = "MALE" | "FEMALE";

export interface BodyProfile {
  id: number;
  userId: number;
  gender: GenderApi;
  heightCm: number;
  weightKg: number;
  chestCm: number;
  waistCm: number;
  hipCm: number;
  shoulderCm: number;
  inseamCm: number;
  createdAt: string;
  updatedAt?: string;
}

export interface GenerateAvatarRequest {
  gender: GenderApi;
  heightCm: number;
  weightKg: number;
  chestCm: number;
  waistCm: number;
  hipCm: number;
  shoulderCm: number;
  inseamCm: number;
}

export interface ShapeParams {
  chest: number;
  waist: number;
  hip: number;
  shoulder: number;
  height: number;
  weight: number;
}

export interface BodyGenerationResult {
  bodyType: string;
  avatarPresetCode: string;
  shapeParams: ShapeParams;
  previewUrl: string;
  modelUrl: string;
  confidence: number;
}
