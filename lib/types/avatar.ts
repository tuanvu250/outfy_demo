export type Gender = 'male' | 'female' | 'non-binary';

export interface BodyMeasurements {
  height: number;   // cm
  weight: number;   // kg
  chest: number;    // cm
  waist: number;    // cm
  hips: number;     // cm
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
