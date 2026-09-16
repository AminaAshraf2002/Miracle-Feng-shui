'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  products as initialProducts,
  categories,
} from '@/lib/placeholder-data';

export type HomeSectionId =
  | 'hero'
  | 'featured_interests'
  | 'auspicious_collections'
  | 'prosperity_gifts'
  | 'special_gifts'
  | 'todays_deals'
  | 'fashion_guide'
  | 'sacred_knowledge';

export interface HomeSectionConfig {
  id: HomeSectionId;
  name: string;
  enabled: boolean;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  badge?: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface StoreOrder {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalAmount: number;
  paymentMethod: string;
  status: OrderStatus;
}

export const defaultSections: HomeSectionConfig[] = [
  {
    id: 'hero',
    name: 'Hero Promotional Banner',
    enabled: true,
    title: 'Invite wealth, peace & positive energy home',
    subtitle: 'Taoist master-blessed authentic talismans, consecrated jewelry, and handcrafted Feng Shui cures.',
    ctaText: 'Shop Feng Shui',
    ctaLink: '/shop?q=feng+shui',
    badge: 'Conscious Craftsmanship',
  },
  {
    id: 'featured_interests',
    name: 'Jump into Featured Interests',
    enabled: true,
    title: 'Jump into featured interests',
    subtitle: 'Explore authentic Feng Shui cures, jewelry, candles, and meditation crystals.',
  },
  {
    id: 'auspicious_collections',
    name: 'Auspicious Collections',
    enabled: true,
    title: 'Discover our most auspicious collections',
    subtitle: 'Hand-picked talismans aligned with Bagua energy sectors.',
  },
  {
    id: 'prosperity_gifts',
    name: 'Prosperity Gifts & Thumbnail Picks',
    enabled: true,
    title: 'Miracle feng shui-special gifts for prosperity',
    subtitle: 'Consciously crafted prosperity essentials and customer favorites.',
    ctaText: 'Get inspired',
    ctaLink: '/shop?category=Feng%20Shui%20Decor',
  },
  {
    id: 'special_gifts',
    name: 'Gifts As Special As They Are',
    enabled: true,
    title: 'Gifts as special as they are',
    subtitle: 'Curated sets for new beginnings, housewarming, and protection.',
  },
  {
    id: 'todays_deals',
    name: "Today's Auspicious Deals",
    enabled: true,
    title: "Today's auspicious deals",
    subtitle: 'Special blessing discounts ending tonight.',
    badge: 'Limited-time Chi Boost',
  },
  {
    id: 'fashion_guide',
    name: 'Energy & Harmony Visual Guide',
    enabled: true,
    title: "Miracle feng shui's Guide to Energy & Harmony",
    subtitle: 'From sacred brass talismans to handcrafted healing crystals, everything you need to balance your home and spirit.',
  },
  {
    id: 'sacred_knowledge',
    name: 'Sacred Knowledge & Articles',
    enabled: true,
    title: 'From our Feng Shui Masters & Curators',
    subtitle: 'Ancient wisdom and modern placement tips for high Chi living.',
  },
];

const sampleOrders: StoreOrder[] = [
  {
    id: 'ord-1001',
    orderNumber: 'MFS-82914',
    date: '2026-09-14 14:32',
    customerName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Lotus Towers, Andheri West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400053',
    items: [
      {
        productId: 'j4',
        productName: 'Temple Blessed 2027 Tai Sui Protection Bracelet',
        price: 1464,
        quantity: 1,
        image: 'https://i.etsystatic.com/58154797/r/il/827b49/7627716971/il_fullxfull.7627716971_ctfy.jpg',
      },
      {
        productId: 'd1',
        productName: 'Taoist Master Blessed Five Emperor Coins',
        price: 4008,
        quantity: 1,
        image: 'https://i.etsystatic.com/61062687/r/il/8c215d/7104788870/il_794xN.7104788870_shv6.jpg',
      },
    ],
    totalAmount: 5472,
    paymentMethod: 'UPI / Online Payment',
    status: 'Processing',
  },
  {
    id: 'ord-1002',
    orderNumber: 'MFS-82915',
    date: '2026-09-13 11:15',
    customerName: 'Priya Iyer',
    email: 'priya.iyer@example.com',
    phone: '+91 98234 56789',
    address: 'Villa 12, Palm Meadows, Whitefield',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560066',
    items: [
      {
        productId: 'c1',
        productName: 'Money Multiplying Poster, Wealth Building Feng Shui',
        price: 2433,
        quantity: 2,
        image: 'https://i.etsystatic.com/19246526/r/il/35c642/6558547910/il_fullxfull.6558547910_qiy1.jpg',
      },
    ],
    totalAmount: 4866,
    paymentMethod: 'Credit Card',
    status: 'Delivered',
  },
  {
    id: 'ord-1003',
    orderNumber: 'MFS-82916',
    date: '2026-09-15 09:40',
    customerName: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    phone: '+91 99100 23456',
    address: 'B-702, DLF Phase 5',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122002',
    items: [
      {
        productId: 'j2',
        productName: 'S925 Pixiu Ring, Feng Shui Wealth Luck Amulet',
        price: 3462,
        quantity: 1,
        image: 'https://i.etsystatic.com/65398995/r/il/637ebb/7994749201/il_1080xN.7994749201_tjcq.jpg',
      },
    ],
    totalAmount: 3462,
    paymentMethod: 'Cash on Delivery',
    status: 'Pending',
  },
];

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'> & { id?: string }) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  resetProducts: () => void;

  // Sections
  sections: HomeSectionConfig[];
  moveSection: (index: number, direction: 'up' | 'down') => void;
  toggleSection: (id: HomeSectionId) => void;
  updateSection: (id: HomeSectionId, data: Partial<HomeSectionConfig>) => void;
  resetSections: () => void;

  // Orders
  orders: StoreOrder[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
  addOrder: (order: Omit<StoreOrder, 'id'>) => void;

  isLoaded: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const PRODUCTS_KEY = 'mfs_products_v2';
const SECTIONS_KEY = 'mfs_sections_v2';
const ORDERS_KEY = 'mfs_orders_v2';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [sections, setSections] = useState<HomeSectionConfig[]>(defaultSections);
  const [orders, setOrders] = useState<StoreOrder[]>(sampleOrders);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted data
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(PRODUCTS_KEY);
      if (storedProducts) {
        const parsed = JSON.parse(storedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }

      const storedSections = localStorage.getItem(SECTIONS_KEY);
      if (storedSections) {
        const parsed = JSON.parse(storedSections);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with default in case new section was added
          const merged = parsed.map((s: HomeSectionConfig) => {
            const def = defaultSections.find((d) => d.id === s.id);
            return { ...def, ...s };
          });
          setSections(merged);
        }
      }

      const storedOrders = localStorage.getItem(ORDERS_KEY);
      if (storedOrders) {
        const parsed = JSON.parse(storedOrders);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
        }
      }
    } catch (err) {
      console.error('Error loading store data from localStorage:', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save products
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products:', e);
    }
  }, [products, isLoaded]);

  // Save sections
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(SECTIONS_KEY, JSON.stringify(sections));
    } catch (e) {
      console.error('Failed to save sections:', e);
    }
  }, [sections, isLoaded]);

  // Save orders
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders:', e);
    }
  }, [orders, isLoaded]);

  // Product Actions
  const addProduct = (newProd: Omit<Product, 'id'> & { id?: string }) => {
    const id = newProd.id || `prod_${Date.now()}`;
    const fullProd: Product = {
      ...newProd,
      id,
      rating: newProd.rating ?? 5.0,
      reviewCount: newProd.reviewCount ?? 1,
      itemDetails: newProd.itemDetails?.length ? newProd.itemDetails : ['Temple blessed authentic talisman'],
      maker: newProd.maker || 'Miracle Feng Shui Studio',
    };
    setProducts((prev) => [fullProd, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  const resetProducts = () => {
    setProducts(initialProducts);
    localStorage.removeItem(PRODUCTS_KEY);
  };

  // Section Actions
  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sections.length - 1) return;

    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    setSections(newSections);
  };

  const toggleSection = (id: HomeSectionId) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const updateSection = (id: HomeSectionId, data: Partial<HomeSectionConfig>) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data } : s))
    );
  };

  const resetSections = () => {
    setSections(defaultSections);
    localStorage.removeItem(SECTIONS_KEY);
  };

  // Order Actions
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const addOrder = (order: Omit<StoreOrder, 'id'>) => {
    const id = `ord-${Date.now()}`;
    setOrders((prev) => [{ ...order, id }, ...prev]);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        resetProducts,
        sections,
        moveSection,
        toggleSection,
        updateSection,
        resetSections,
        orders,
        updateOrderStatus,
        deleteOrder,
        addOrder,
        isLoaded,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
