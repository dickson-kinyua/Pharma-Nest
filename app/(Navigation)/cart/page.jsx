"use client";

import Cart from "@/components/Cart";
import { useEffect, useState } from "react";
// import { UserCart } from "@/Context/cartContext";
import { useRouter } from "next/navigation";
import { UserCart } from "@/Context/cartContext";

const CarFetch = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setCartList } = UserCart();

  // Fetch cart items after verifying the user with middleware
  const fetchCart = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
        {
          cache: "no-store",
          credentials: "include", // Ensure the cookie is sent
        }
      );

      const data = await response.json();
      if (response.ok) {
        setCartItems(data);
        setCartList(data); // Update global cart context if needed
      } else {
        setError(data.error || "Failed to fetch cart");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("An unexpected error occurred while fetching the cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="mt-[80px]">
      {error && <p className="text-red-500">{error}</p>}
      <Cart cartItems={cartItems} fetchCart={fetchCart} loading={loading} />
    </div>
  );
};

export default CarFetch;
