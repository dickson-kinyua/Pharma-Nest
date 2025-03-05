"use client";

import Cart from "@/components/Cart";
import { useEffect, useState } from "react";
import { UserCart } from "@/Context/cartContext";
import { useLoggedUser } from "@/Context/userContext";

const CarFetch = () => {
  const { loggedUser, setLoggedUser } = useLoggedUser();
  const { setCartList } = UserCart();
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
        {
          cache: "no-store",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log(data.error);
        setLoading(false);
        return;
      }

      setCartItems(data);
      setCartList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [loggedUser]);

  useEffect(() => {
    async function verifyUser() {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        // console.log(data);
        return;
      }
      // setLoading(false);
      setLoggedUser(data);
    }
    verifyUser();
  }, []);

  return <Cart cartItems={cartItems} fetchCart={fetchCart} loading={loading} />;
};

export default CarFetch;

// export default async function CartFetch() {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
//     credentials: "include",
//   });

//   const data = await response.json();
//   if (!response.ok) {
//     console.log(data.error);
//     return;
//   }
//   console.log(data);
//   return <Cart cartItems={data} />;
// }
