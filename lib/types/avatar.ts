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
// NEW: Body Generation Types (for 3D Avatar)
// ============================================

export type GenderApi = "male" | "female";

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

export interface BodyGenerationResult {
  bodyType: "Slim" | "Regular" | "Curvy" | "Broad";
  avatarPresetCode: string;
  modelUrl: string;
  previewUrl: string;
  shapeParams: Record<string, number>;
  confidence: number;
}
