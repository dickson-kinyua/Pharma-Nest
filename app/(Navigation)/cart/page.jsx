"use client";

import Cart from "@/components/Cart";
import { useEffect, useState } from "react";
import { UserCart } from "@/Context/cartContext";
import { useLoggedUser } from "@/Context/userContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CarFetch = () => {
  const router = useRouter();
  const { session, status } = useSession();

  const { loggedUser, setLoggedUser } = useLoggedUser();
  const { setCartList } = UserCart();
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true); // Track auth check

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        const data = await res.json();
        // console.log(data);

        if (res.ok) {
          if (session?.user) {
            setLoggedUser(session?.user);
            return;
          } else {
            setLoggedUser(data);
          }
        } else {
          if (session?.user) {
            setLoggedUser(session?.user);
          } else {
            setLoggedUser(null); // Ensure it's explicitly set
            router.push(`/login?redirect=/cart`);
          }
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        setLoggedUser(null);
        router.push(`/login?redirect=/cart`);
      } finally {
        setCheckingAuth(false); // Done checking authentication
      }
    };

    verifyUser();
  }, [setLoggedUser, router]);

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
      if (response.ok) {
        setCartItems(data);
        setCartList(data);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedUser) {
      fetchCart();
    }
  }, [loggedUser]); // Fetch cart once user authentication is confirmed

  // Prevent rendering while checking authentication
  if (checkingAuth) {
    return <p>Loading...</p>; // Can replace with a proper loader
  }

  return <Cart cartItems={cartItems} fetchCart={fetchCart} loading={loading} />;
};

export default CarFetch;
