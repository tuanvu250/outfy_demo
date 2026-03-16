// ============================================
// AI 3D Cloth Pipeline API
// ============================================

import {
  AnalyzeClothingRequest,
  ClothingAnalysisResult,
  AddToWardrobeRequest,
  WardrobeItem,
  UpdateWardrobeRequest,
  CreateDraftRequest,
  Draft,
  ApiResponse,
} from "@/lib/types/cloth";
import api from "./index";

const CLOTHES_API_PATH = "/clothes/analyze-direct";
const WARDROBE_API_PATH = "/wardrobe";
const DRAFTS_API_PATH = "/drafts";

// ============================================
// Clothing Analysis API
// ============================================

export async function analyzeClothing(
  request: AnalyzeClothingRequest,
): Promise<ClothingAnalysisResult> {
  const response = await api.post<ApiResponse<ClothingAnalysisResult>>(
    CLOTHES_API_PATH,
    request,
  );
  return response as unknown as ClothingAnalysisResult;
}

// ============================================
// Wardrobe APIs
// ============================================

export async function addToWardrobe(
  request: AddToWardrobeRequest,
): Promise<WardrobeItem> {
  const params = new URLSearchParams();
  params.append("clothingItemId", request.clothingItemId.toString());
  params.append("userId", request.userId.toString());
  if (request.season) params.append("season", request.season);
  if (request.notes) params.append("notes", request.notes);

  const response = await api.post<ApiResponse<WardrobeItem>>(
    `${WARDROBE_API_PATH}/from-clothing?${params.toString()}`,
  );
  return response as unknown as WardrobeItem;
}

export async function getUserWardrobe(userId: number): Promise<WardrobeItem[]> {
  const response = await api.get<ApiResponse<WardrobeItem[]>>(
    `${WARDROBE_API_PATH}/user/${userId}`,
  );
  return response as unknown as WardrobeItem[];
}

export async function getWardrobeItem(id: number): Promise<WardrobeItem> {
  const response = await api.get<ApiResponse<WardrobeItem>>(
    `${WARDROBE_API_PATH}/${id}`,
  );
  return response as unknown as WardrobeItem;
}

export async function getWardrobeByCategory(
  userId: number,
  category: string,
): Promise<WardrobeItem[]> {
  const response = await api.get<ApiResponse<WardrobeItem[]>>(
    `${WARDROBE_API_PATH}/user/${userId}/category/${category}`,
  );
  return response as unknown as WardrobeItem[];
}

export async function getFavoriteWardrobe(
  userId: number,
): Promise<WardrobeItem[]> {
  const response = await api.get<ApiResponse<WardrobeItem[]>>(
    `${WARDROBE_API_PATH}/user/${userId}/favorites`,
  );
  return response as unknown as WardrobeItem[];
}

export async function getWardrobeBySeason(
  userId: number,
  season: string,
): Promise<WardrobeItem[]> {
  const response = await api.get<ApiResponse<WardrobeItem[]>>(
    `${WARDROBE_API_PATH}/user/${userId}/season/${season}`,
  );
  return response as unknown as WardrobeItem[];
}

export async function toggleFavorite(id: number): Promise<WardrobeItem> {
  const response = await api.patch<ApiResponse<WardrobeItem>>(
    `${WARDROBE_API_PATH}/${id}/favorite`,
  );
  return response as unknown as WardrobeItem;
}

export async function updateWardrobeItem(
  id: number,
  request: UpdateWardrobeRequest,
): Promise<WardrobeItem> {
  const response = await api.put<ApiResponse<WardrobeItem>>(
    `${WARDROBE_API_PATH}/${id}`,
    request,
  );
  return response as unknown as WardrobeItem;
}

export async function deleteWardrobeItem(id: number): Promise<void> {
  await api.delete(`${WARDROBE_API_PATH}/${id}`);
}

// ============================================
// Draft APIs
// ============================================

export async function createDraft(request: CreateDraftRequest): Promise<Draft> {
  const response = await api.post<ApiResponse<Draft>>(DRAFTS_API_PATH, request);
  return response as unknown as Draft;
}

export async function getUserDrafts(
  userId: number,
  type?: string,
): Promise<Draft[]> {
  const params = new URLSearchParams();
  params.append("userId", userId.toString());
  if (type) params.append("type", type);

  const response = await api.get<ApiResponse<Draft[]>>(
    `${DRAFTS_API_PATH}?${params.toString()}`,
  );
  return response as unknown as Draft[];
}

export async function analyzeDraft(draftId: number): Promise<Draft> {
  const response = await api.post<ApiResponse<Draft>>(
    `${DRAFTS_API_PATH}/${draftId}/analyze`,
  );
  return response as unknown as Draft;
}

export async function reAnalyzeDraft(draftId: number): Promise<Draft> {
  const response = await api.post<ApiResponse<Draft>>(
    `${DRAFTS_API_PATH}/${draftId}/reanalyze`,
  );
  return response as unknown as Draft;
}

export async function deleteDraft(
  draftId: number,
  userId: number,
): Promise<void> {
  await api.delete(`${DRAFTS_API_PATH}/${draftId}?userId=${userId}`);
}
