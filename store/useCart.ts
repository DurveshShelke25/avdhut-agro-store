// store/useCart.ts
import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
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