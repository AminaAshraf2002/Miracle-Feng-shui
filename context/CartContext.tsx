'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '@/lib/placeholder-data';

export type CartItem = {
  id: string; // unique item id combining product id and variations
  product: Product;
  quantity: number;
  selectedVariations?: Record<string, string>;
  personalizationText?: string;
  isGift?: boolean;
};

export interface ToastInfo {
  open: boolean;
  title: string;
  subtitle?: string;
  type?: 'favorite' | 'cart' | 'info';
}

interface CartContextType {
  items: CartItem[];
  addItem: (
    product: Product,
    quantity?: number,
    selectedVariations?: Record<string, string>,
    personalizationText?: string
  ) => void;
  removeItem: (itemId: string) => void;
  setQty: (itemId: string, quantity: number) => void;
  toggleGift: (itemId: string) => void;
  saveForLater: (itemId: string) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
  savings: number;

  // Favorites / Wishlist
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Auth & Guest Toast
  userLoggedIn: boolean;
  setUserLoggedIn: (val: boolean) => void;
  guestToast: ToastInfo | null;
  showGuestToast: (title?: string, subtitle?: string, type?: 'favorite' | 'cart' | 'info') => void;
  closeGuestToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'miracle_feng_shui_cart_v1';
const FAV_STORAGE_KEY = 'miracle_feng_shui_favorites_v1';
const USER_STORAGE_KEY = 'miracle_feng_shui_user_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [userLoggedIn, setUserLoggedInState] = useState(false);
  const [guestToast, setGuestToast] = useState<ToastInfo | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedFavs = localStorage.getItem(FAV_STORAGE_KEY);
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        setUserLoggedInState(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to load storage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [items, isLoaded]);

  // Save favorites to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites:', e);
    }
  }, [favorites, isLoaded]);

  const setUserLoggedIn = useCallback((val: boolean) => {
    setUserLoggedInState(val);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(val));
    } catch (e) {
      console.error('Failed to save user session:', e);
    }
  }, []);

  const showGuestToast = useCallback((
    title = "Don't lose this favourite!",
    subtitle = "to add to your wishlist.",
    type: 'favorite' | 'cart' | 'info' = 'favorite'
  ) => {
    setGuestToast({
      open: true,
      title,
      subtitle,
      type,
    });
  }, []);

  const closeGuestToast = useCallback(() => {
    setGuestToast(null);
  }, []);

  // Listen to custom show-guest-toast events
  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{
        title?: string;
        subtitle?: string;
        type?: 'favorite' | 'cart' | 'info';
      }>;
      const detail = customEvent.detail || {};
      showGuestToast(
        detail.title || (detail.type === 'cart' ? "Don't lose this item!" : "Don't lose this favourite!"),
        detail.subtitle || (detail.type === 'cart' ? "to add to your cart." : "to add to your wishlist."),
        detail.type || 'favorite'
      );
    };

    window.addEventListener('show-guest-toast', handleToastEvent);
    return () => {
      window.removeEventListener('show-guest-toast', handleToastEvent);
    };
  }, [showGuestToast]);

  const addItem = useCallback((
    product: Product,
    quantity: number = 1,
    selectedVariations?: Record<string, string>,
    personalizationText?: string
  ) => {
    if (quantity <= 0) return;

    // Create unique key based on product + variations
    const varKey = selectedVariations
      ? Object.entries(selectedVariations)
          .map(([k, v]) => `${k}:${v}`)
          .sort()
          .join('|')
      : '';
    const itemId = `${product.id}-${varKey}-${personalizationText || ''}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          quantity,
          selectedVariations,
          personalizationText,
          isGift: false,
        },
      ];
    });

    // Trigger guest toast if user is not logged in
    if (!userLoggedIn) {
      showGuestToast(
        "Don't lose this item!",
        'to add to your cart.',
        'cart'
      );
    }
  }, [userLoggedIn, showGuestToast]);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const setQty = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  }, []);

  const toggleGift = useCallback((itemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isGift: !item.isGift } : item
      )
    );
  }, []);

  const addFavorite = useCallback((product: Product) => {
    setFavorites((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [product, ...prev];
    });

    if (!userLoggedIn) {
      showGuestToast(
        "Don't lose this favourite!",
        'to add to your wishlist.',
        'favorite'
      );
    }
  }, [userLoggedIn, showGuestToast]);

  const removeFavorite = useCallback((productId: string) => {
    setFavorites((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const isFavorite = useCallback((productId: string) => {
    return favorites.some((p) => p.id === productId);
  }, [favorites]);

  const saveForLater = useCallback((itemId: string) => {
    setItems((prev) => {
      const itemToSave = prev.find((it) => it.id === itemId);
      if (itemToSave) {
        setFavorites((favs) => {
          if (favs.some((p) => p.id === itemToSave.product.id)) return favs;
          return [itemToSave.product, ...favs];
        });
      }
      return prev.filter((it) => it.id !== itemId);
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const savings = items.reduce((sum, item) => {
    if (item.product.originalPrice && item.product.originalPrice > item.product.price) {
      return (
        sum +
        (item.product.originalPrice - item.product.price) * item.quantity
      );
    }
    return sum;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        setQty,
        toggleGift,
        saveForLater,
        clearCart,
        count,
        subtotal,
        savings,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        userLoggedIn,
        setUserLoggedIn,
        guestToast,
        showGuestToast,
        closeGuestToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
