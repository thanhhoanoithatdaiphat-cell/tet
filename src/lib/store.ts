import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductId } from "./products";
import { getProduct } from "./products";

export type CartLine = { id: ProductId; qty: number };

export type Order = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  address: string;
  note: string;
  payment: "cod";
  items: CartLine[];
  total: number;
};

type ShopState = {
  cart: CartLine[];
  orders: Order[];
  checkoutOpen: boolean;
  videoId: string | null;
  add: (id: ProductId) => void;
  setQty: (id: ProductId, qty: number) => void;
  remove: (id: ProductId) => void;
  clearCart: () => void;
  openCheckout: (id?: ProductId) => void;
  closeCheckout: () => void;
  openVideo: (src: string) => void;
  closeVideo: () => void;
  placeOrder: (input: Omit<Order, "id" | "createdAt" | "total" | "items" | "payment">) => Order;
};

export const useShop = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      orders: [],
      checkoutOpen: false,
      videoId: null,
      add: (id) =>
        set((s) => {
          const existing = s.cart.find((l) => l.id === id);
          if (existing) {
            return {
              cart: s.cart.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)),
            };
          }
          return { cart: [...s.cart, { id, qty: 1 }] };
        }),
      setQty: (id, qty) =>
        set((s) => ({
          cart:
            qty <= 0
              ? s.cart.filter((l) => l.id !== id)
              : s.cart.map((l) => (l.id === id ? { ...l, qty } : l)),
        })),
      remove: (id) => set((s) => ({ cart: s.cart.filter((l) => l.id !== id) })),
      clearCart: () => set({ cart: [] }),
      openCheckout: (id) => {
        if (id) {
          const has = get().cart.some((l) => l.id === id);
          if (!has) get().add(id);
        }
        set({ checkoutOpen: true });
      },
      closeCheckout: () => set({ checkoutOpen: false }),
      openVideo: (src) => set({ videoId: src }),
      closeVideo: () => set({ videoId: null }),
      placeOrder: (input) => {
        const items = get().cart;
        const total = items.reduce((sum, l) => sum + getProduct(l.id).price * l.qty, 0);
        const order: Order = {
          id: "NCT-" + Date.now().toString(36).toUpperCase(),
          createdAt: new Date().toISOString(),
          payment: "cod",
          items,
          total,
          ...input,
        };
        set((s) => ({ orders: [order, ...s.orders], cart: [] }));
        void import("./ops-store").then(({ useOps }) => {
          const ops = useOps.getState();
          for (const line of items) ops.consumeStock(line.id, line.qty);
          const first = items[0];
          if (first) {
            ops.addLandingOrder({
              id: order.id,
              createdAt: order.createdAt,
              name: order.name,
              phone: order.phone,
              address: order.address,
              note: order.note,
              setId: first.id,
              qty: first.qty,
              total: order.total,
              source: "landing",
            });
          }
        });
        return order;
      },
    }),
    {
      name: "nha-co-tet-shop",
      partialize: (s) => ({ cart: s.cart, orders: s.orders }),
    },
  ),
);

export function cartCount(cart: CartLine[]) {
  return cart.reduce((n, l) => n + l.qty, 0);
}

export function cartTotal(cart: CartLine[]) {
  return cart.reduce((n, l) => n + getProduct(l.id).price * l.qty, 0);
}
