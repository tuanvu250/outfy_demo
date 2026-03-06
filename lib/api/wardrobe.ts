import api from "./index";
import type { ClothingItem, WardrobeFilter } from "@/lib/types/wardrobe";

export const wardrobeApi = {
  getItems: (filters?: WardrobeFilter) =>
    api.get<ClothingItem[]>("/wardrobe", { params: filters }),

  uploadItem: (formData: FormData) =>
    api.post<ClothingItem>("/wardrobe", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  deleteItem: (id: string) =>
    api.delete(`/wardrobe/${id}`),

  toggleFavorite: (id: string) =>
    api.patch<ClothingItem>(`/wardrobe/${id}/favorite`),
};
