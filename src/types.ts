export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Current price in PKR
  originalPrice: number; // Original price before discount
  discountPercent: number; // E.g., 40 for 40% off
  rating: number; // E.g., 4.8
  reviewCount: number;
  imageUrl: string;
  category: string;
  brand: string;
  isFlashSale?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Review {
  id: string;
  userName: string;
  location: string;
  rating: number;
  comment: string;
  avatarUrl: string;
}

export interface User {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface Order {
  id: string;
  date: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Received";
}
