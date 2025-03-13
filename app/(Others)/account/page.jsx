"use client";

import Orders from "@/components/Orders";
import Services from "@/components/Services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { UserCart } from "@/Context/cartContext";
import { useLoggedUser } from "@/Context/userContext";
import { useEffect, useState } from "react";
// import LoginPage from "../login/page";

const Account = () => {
  const { loggedUser, setLoggedUser } = useLoggedUser();
  const { session, status } = useSession();
  const router = useRouter();
  const { clearCart } = UserCart();
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
            router.push(`/login?redirect=/account`);
            return;
          }
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        setLoggedUser(null);
        router.push(`/login?redirect=/account`);
      } finally {
        setCheckingAuth(false); // Done checking authentication
      }
    };

    verifyUser();
  }, [setLoggedUser, router]);

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
      method: "POST",
    }); // Clears JWT cookie (only if needed)
    setLoggedUser(null); // Clear frontend state
    signOut(); // Log out of NextAuth
    clearCart(); // Clear account state
  };

  // Prevent rendering while checking authentication
  if (checkingAuth || !loggedUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-3 flex flex-col gap-3 bg-gray-200 text-sm h-svh">
      <div className="bg-blue-500 p-4 flex justify-between gap-4 text-white">
        <Link href={"/"} className="underline">
          ↖ back
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Orders />
      <Services />
    </div>
  );
};

export default Account;
