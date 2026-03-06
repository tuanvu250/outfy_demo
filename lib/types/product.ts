export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  isFavorite: boolean;
  inStock: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}
