import api from "./index";
import type {
  Avatar,
  AvatarSetupData,
  BodyMeasurements,
  GenerateAvatarRequest,
  BodyGenerationResult,
} from "@/lib/types/avatar";

// Backend response wrapper type
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const avatarApi = {
  get: () => api.get<Avatar>("/avatar"),

  create: (data: AvatarSetupData) => api.post<Avatar>("/avatar", data),

  updateMeasurements: (measurements: BodyMeasurements) =>
    api.put<Avatar>("/avatar/measurements", measurements),

  uploadScanImages: (formData: FormData) =>
    api.post<Avatar>("/avatar/scan", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  fitAnalysis: (formData: FormData) =>
    api.post<{ fitScore: number; comments: string[]; sizeSuggestion: string }>(
      "/ai/fit-analysis",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    ),

  // ============================================
  // NEW: 3D Body Generation API
  // ============================================
  generateAvatar: async (
    data: GenerateAvatarRequest,
  ): Promise<BodyGenerationResult> => {
    const response = await api.post<ApiResponse<BodyGenerationResult>>(
      "/body-profiles/generate-avatar",
      data,
    );
    // Backend returns wrapped response: { success, message, data }
    return response.data.data;
  },
};
