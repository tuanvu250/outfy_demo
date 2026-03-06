import api from "./index";
import type { Avatar, AvatarSetupData, BodyMeasurements } from "@/lib/types/avatar";

export const avatarApi = {
  get: () => api.get<Avatar>("/avatar"),

  create: (data: AvatarSetupData) =>
    api.post<Avatar>("/avatar", data),

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
      { headers: { "Content-Type": "multipart/form-data" } }
    ),
};
