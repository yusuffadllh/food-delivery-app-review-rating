export type View = 'home' | 'restaurant' | 'cart' | 'checkout' | 'tracking' | 'history' | 'review' | 'auth';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  ratingCount: number;
  deliveryTime: string;
  distance: string;
  image: string;
  address: string;
  isOpen: boolean;
  isPromo: boolean;
}

export interface Order {
  id: string;
  restaurantName: string;
  date: string;
  status: 'Selesai' | 'Dibatalkan' | 'Sedang Diproses';
  items: string;
  price: number;
  image: string;
  driverName?: string;
  estimatedTime?: string;
}

export interface CartItem {
  id_menu: number;
  nama_menu: string;
  harga: number;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
