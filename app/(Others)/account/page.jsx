"use client";

import Orders from "@/components/Orders";
import Services from "@/components/Services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { UserCart } from "@/Context/cartContext";
import { useLoggedUser } from "@/Context/userContext";
import { useEffect } from "react";
import LoginPage from "../login/page";

const Account = () => {
  const { loggedUser, setLoggedUser } = useLoggedUser();
  const { session, status } = useSession();
  const router = useRouter();
  const { clearCart } = UserCart();

  // Sync loggedUser with session
  useEffect(() => {
    if (session?.user && !loggedUser) {
      setLoggedUser(session.user);
    }
  }, [session, loggedUser, setLoggedUser]);

  //Redirect to login page if not authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/account"); // ✅ Ensures immediate navigation without history stack issues
    }
  }, [status, router]);

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
      method: "POST",
    }); // Clears JWT cookie (only if needed)
    clearCart(); // Clear cart state
    setLoggedUser(null); // Clear frontend state
    signOut(); // Log out of NextAuth
  };

  // if (status === "loading") return <p>Loading...</p>;

  //Avoid rendering the page during redirection
  if (!session && !loggedUser?.email) return <LoginPage />;

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
