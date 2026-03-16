// ============================================
// AI 3D Cloth Pipeline API
// ============================================

import {
  AnalyzeClothingRequest,
  ClothingAnalysisResult,
  ApiResponse,
} from "@/lib/types/cloth";
import api from "./index";

const API_PATH = "/clothes/analyze-direct";

export async function analyzeClothing(
  request: AnalyzeClothingRequest,
): Promise<ClothingAnalysisResult> {
  const response = await api.post<ApiResponse<ClothingAnalysisResult>>(
    API_PATH,
    request,
  );
  return response as unknown as ClothingAnalysisResult;
}
