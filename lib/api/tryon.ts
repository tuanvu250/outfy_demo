// ============================================
// Try-On Pipeline API
// ============================================

import {
  CreateTryOnFromClothingRequest,
  CreateTryOnFromWardrobeRequest,
  UpdateTryOnRequest,
  TryOnSession,
  TryOnResult,
  ApiResponse,
} from "@/lib/types/tryon";
import api from "./index";

const TRYON_API_PATH = "/tryons";

// ============================================
// Try-On Session APIs
// ============================================

export async function createTryOnFromClothing(
  request: CreateTryOnFromClothingRequest,
): Promise<TryOnSession> {
  const response = await api.post<ApiResponse<TryOnSession>>(
    TRYON_API_PATH,
    request,
  );
  return response as unknown as TryOnSession;
}

export async function createTryOnFromWardrobe(
  request: CreateTryOnFromWardrobeRequest,
): Promise<TryOnSession> {
  const response = await api.post<ApiResponse<TryOnSession>>(
    `${TRYON_API_PATH}/from-wardrobe`,
    request,
  );
  return response as unknown as TryOnSession;
}

export async function getTryOnSession(id: number): Promise<TryOnSession> {
  const response = await api.get<ApiResponse<TryOnSession>>(
    `${TRYON_API_PATH}/${id}`,
  );
  return response as unknown as TryOnSession;
}

export async function getUserTryOnSessions(
  userId: number,
): Promise<TryOnSession[]> {
  const response = await api.get<ApiResponse<TryOnSession[]>>(
    `${TRYON_API_PATH}/user/${userId}`,
  );
  return response as unknown as TryOnSession[];
}

export async function getFavoriteTryOns(
  userId: number,
): Promise<TryOnSession[]> {
  const response = await api.get<ApiResponse<TryOnSession[]>>(
    `${TRYON_API_PATH}/user/${userId}/favorites`,
  );
  return response as unknown as TryOnSession[];
}

export async function updateTryOnSession(
  id: number,
  request: UpdateTryOnRequest,
): Promise<TryOnSession> {
  const response = await api.put<ApiResponse<TryOnSession>>(
    `${TRYON_API_PATH}/${id}`,
    request,
  );
  return response as unknown as TryOnSession;
}

export async function deleteTryOnSession(id: number): Promise<void> {
  await api.delete(`${TRYON_API_PATH}/${id}`);
}

export async function toggleTryOnFavorite(id: number): Promise<TryOnSession> {
  const response = await api.patch<ApiResponse<TryOnSession>>(
    `${TRYON_API_PATH}/${id}/favorite`,
  );
  return response as unknown as TryOnSession;
}

// ============================================
// Try-On Result APIs
// ============================================

export async function generateTryOnResult(id: number): Promise<TryOnResult> {
  const response = await api.post<ApiResponse<TryOnResult>>(
    `${TRYON_API_PATH}/${id}/generate`,
  );
  return response as unknown as TryOnResult;
}

export async function regenerateTryOnResult(id: number): Promise<TryOnResult> {
  const response = await api.post<ApiResponse<TryOnResult>>(
    `${TRYON_API_PATH}/${id}/regenerate`,
  );
  return response as unknown as TryOnResult;
}

export async function getTryOnResultDetail(id: number): Promise<TryOnResult> {
  const response = await api.get<ApiResponse<TryOnResult>>(
    `${TRYON_API_PATH}/${id}/result/detail`,
  );
  return response as unknown as TryOnResult;
}

