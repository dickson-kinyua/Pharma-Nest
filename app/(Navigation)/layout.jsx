"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import Header from "@/components/Header";

const WithNavbarLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [showOverlay, setShowOverlay] = useState(false);

  const handleNavigateToCart = async () => {
    setShowOverlay(true); // Show overlay

    try {
      // Fetch cart data
      const response = await fetch("/api/cart");
      if (!response.ok) throw new Error("Failed to fetch cart data");

      const cartData = await response.json();
      console.log("Cart Data:", cartData); // Debugging

      // Navigate after fetching
      startTransition(() => {
        router.push("/cart");
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
      setShowOverlay(false); // Hide overlay on error
    }
  };

  // 🔹 Hide overlay when route changes
  useEffect(() => {
    setShowOverlay(false);
  }, [pathname]); // Runs when `pathname` changes

  return (
    <div className="relative">
      {/* Pass function to Header */}
      <Header onCartClick={handleNavigateToCart} />

      {/* Page Content with blur effect */}
      <main
        className={`${
          showOverlay ? "blur-sm opacity-50" : ""
        } transition-all duration-300`}
      >
        {children}
      </main>

      {/* Overlay while fetching */}
      {showOverlay && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
          {/* Animated Spinner */}
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent z-50"></div>

          {/* Loading Text */}
          <p className="mt-3 text-lg font-semibold text-white">
            Loading Cart...
          </p>
        </div>
      )}
    </div>
  );
};

export default WithNavbarLayout;
