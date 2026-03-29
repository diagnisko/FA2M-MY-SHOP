export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface ProductListItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: number;
  category: number | null;
  category_name?: string;
  main_image: string | null;
  is_active: boolean;
}

export interface ProductImage {
  id: number;
  image: string;
  sort_order: number;
}

export interface ProductDetail extends ProductListItem {
  category_detail: Category | null;
  images: ProductImage[];
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: number;
  product: number;
  product_name: string;
  unit_price: string;
  main_image: string | null;
  quantity: number;
  line_total: string;
}

export interface CartResponse {
  items: CartItem[];
  subtotal: string;
}

export interface Order {
  id: number;
  status: string;
  payment_method: string;
  total: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  notes: string;
  items: { product: number | null; product_name: string; unit_price: string; quantity: number }[];
  created_at: string;
  updated_at: string;
}

export interface AdminOrder extends Order {
  user: number | null;
  username: string;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  is_staff: boolean;
}
