"use client";

import Orders from "@/components/Orders";
import Services from "@/components/Services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { UserCart } from "@/Context/cartContext";
import { useLoggedUser } from "@/Context/userContext";
import { useEffect, useState } from "react";

const Account = () => {
  const { loggedUser, setLoggedUser } = useLoggedUser();
  const { data: session, status } = useSession();
  const router = useRouter();
  const { clearCart } = UserCart();
  const [checkingAuth, setCheckingAuth] = useState(true); // Track auth check

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
          router.push(`/login?redirect=/account`);
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        setLoggedUser(null);
        router.push(`/login?redirect=/account`);
      } finally {
        setCheckingAuth(false);
      }
    };

    verifyUser();
  }, [session, setLoggedUser, router]);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: "POST",
      });

      await signOut({ redirect: false }); // Ensure sign-out completes
      setLoggedUser(null);
      clearCart();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (checkingAuth || !loggedUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-3 flex flex-col gap-3 bg-gray-200 text-sm h-svh">
      <div className="bg-blue-500 p-4 flex justify-between gap-4 text-white">
        <Link href={"/"} className="underline">
          ↖ back
        </Link>
        {session?.user?.image ? (
          <img
            className="w-5 h-5 rounded-full"
            src={session?.user?.image}
            alt="profile"
          />
        ) : null}

        <button onClick={handleLogout}>Logout</button>
      </div>
      <Orders />
      <Services />
    </div>
  );
};

export default Account;
