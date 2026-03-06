import api from "./index";
import type { Product } from "@/lib/types/product";

export const productsApi = {
  getAll: (params?: { page?: number; limit?: number; category?: string; brand?: string }) =>
    api.get<{ items: Product[]; total: number }>("/products", { params }),

  getById: (id: string) =>
    api.get<Product>(`/products/${id}`),

  toggleFavorite: (id: string) =>
    api.patch<Product>(`/products/${id}/favorite`),
};
