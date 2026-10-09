import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useCart } from "../store/cart";
import { apiFetch } from "../lib/api";

type Product = {
  currency(priceCents: number, currency: any): import("react").ReactNode;
  slug: any;
  id: string;
  priceCents: number;
  name: string;
  imageUrl?: string | null;
};

type ProductsResponse = {
  products: Product[];
};

type CheckoutResponse = {
  checkoutUrl?: string | null;
};

type CheckoutBody = {
  items: {
    productId: string;
    quantity: number;
  }[];
};

export default function useCartPage() {
  const { getToken } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const removeItem = useCart((s) => s.removeItem);

  const {
    data,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: () => apiFetch("/api/products") as Promise<ProductsResponse>,
    enabled: items.length > 0,
  });

  const products = data?.products ?? [];
  const byId = new Map(products.map((p) => [p.id, p]));

  const lines = items.map((line) => ({
    line,
    product: byId.get(line.productId) ?? null,
  }));

  const subtotal = lines.reduce((sum, { line, product }) => {
    if (!product) return sum;
    return sum + product.priceCents * line.quantity;
  }, 0);

  async function checkout(): Promise<void> {
    setCheckoutLoading(true);

    try {
      const body: CheckoutBody = {
        items: items.map(({ productId, quantity }) => ({
          productId,
          quantity,
        })),
      };

      const res = (await apiFetch("/api/checkout", {
        getToken,
        method: "POST",
        body,
      })) as CheckoutResponse;

      if (res.checkoutUrl) {
        window.location.href = res.checkoutUrl;
        return;
      }
    } finally {
      setCheckoutLoading(false);
    }
  }

  return {
    items,
    setQty,
    removeItem,
    productsLoading,
    productsError,
    lines,
    subtotal,
    checkout,
    checkoutLoading,
  };
}