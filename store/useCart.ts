import { create } from 'zustand';

// 1. --- CART STATE ---
export interface Product {
  id: string;
  name: string;
  name_mr?: string; 
  price: number;
  image: string;
}

interface CartStore {
  cart: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (id: string) => void;
  totalPrice: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id) => set((state) => ({ 
    cart: state.cart.filter((i) => i.id !== id) 
  })),
  totalPrice: () => get().cart.reduce((acc, item) => acc + item.price, 0),
}));

// 2. --- LANGUAGE STATE ---
interface LanguageState {
  lang: 'en' | 'mr';
  toggleLang: () => void;
}

export const useLanguage = create<LanguageState>((set) => ({
  lang: 'en',
  toggleLang: () => set((state) => ({ lang: state.lang === 'en' ? 'mr' : 'en' })),
}));