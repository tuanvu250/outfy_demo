import api from "./index";
import type {
  Avatar,
  AvatarSetupData,
  BodyMeasurements,
  BodyProfile,
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
  // Body Profile APIs
  // ============================================

  /**
   * Create a new body profile (saves to DB)
   */
  createBodyProfile: (
    data: Omit<BodyProfile, "id" | "userId" | "createdAt" | "updatedAt">,
  ) => api.post<ApiResponse<BodyProfile>>("/body-profiles", data),

  /**
   * Get body profile by ID
   */
  getBodyProfileById: (id: number) =>
    api.get<ApiResponse<BodyProfile>>(`/body-profiles/${id}`),

  /**
   * Get all body profiles for a user
   */
  getBodyProfilesByUserId: (userId: number) =>
    api.get<ApiResponse<BodyProfile[]>>(`/body-profiles/user/${userId}`),

  /**
   * Generate 3D avatar from measurements (does NOT save to DB)
   */
  generateAvatar: async (
    data: GenerateAvatarRequest,
  ): Promise<BodyGenerationResult> => {
    // Response type before interceptor: { success, message, data: BodyGenerationResult }
    // Interceptor returns response.data = { success, message, data: BodyGenerationResult }
    const response = (await api.post<ApiResponse<BodyGenerationResult>>(
      "/body-profiles/generate-avatar",
      data,
    )) as unknown as {
      success: boolean;
      message: string;
      data: BodyGenerationResult;
    };

    // After interceptor unwrap, response = { success, message, data: { bodyType, ... } }
    return response.data;
  },
};
