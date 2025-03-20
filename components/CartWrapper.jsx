"use client";

import { useEffect, useState } from "react";
import Cart from "@/components/Cart";

const CartWrapper = ({ initialCartItems }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
        cache: "no-store",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch cart");
      }

      setCartItems(await res.json());
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Failed to fetch cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cartItems) fetchCart(); // Fetch only if initial data is null
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <Cart cartItems={cartItems} onFetchCart={fetchCart} loading={loading} />
    </div>
  );
};

export default CartWrapper;
