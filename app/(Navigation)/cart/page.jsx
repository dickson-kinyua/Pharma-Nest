"use client";

import Cart from "@/components/Cart";
import { useEffect, useState } from "react";
import { UserCart } from "@/Context/cartContext";
import { useLoggedUser } from "@/Context/userContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CarFetch = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { loggedUser, setLoggedUser } = useLoggedUser();
  const { setCartList } = UserCart();
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      if (session?.user) {
        setLoggedUser(session.user);
        setCheckingAuth(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (res.ok) {
          setLoggedUser(data);
        } else {
          setLoggedUser(null);
          router.push(`/login?redirect=/cart`);
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        setLoggedUser(null);
        router.push(`/login?redirect=/cart`);
      } finally {
        setCheckingAuth(false);
      }
    };

    verifyUser();
  }, [session, setLoggedUser, router]);

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
    if (!checkingAuth && loggedUser) {
      fetchCart();
    }
  }, [checkingAuth, loggedUser]);

  if (checkingAuth) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <Cart cartItems={cartItems} fetchCart={fetchCart} loading={loading} />
    </div>
  );
};

export default CarFetch;
