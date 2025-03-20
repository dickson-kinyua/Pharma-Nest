// "use client";

// import Cart from "@/components/Cart";
// import { useEffect, useState } from "react";
// // import { UserCart } from "@/Context/cartContext";
// import { useRouter } from "next/navigation";
// import { UserCart } from "@/Context/cartContext";

// const CarFetch = () => {
//   const router = useRouter();
//   const [cartItems, setCartItems] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { setCartList } = UserCart();

//   // Fetch cart items after verifying the user with middleware
//   const fetchCart = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
//         {
//           cache: "no-store",
//           credentials: "include", // Ensure the cookie is sent
//         }
//       );

//       const data = await response.json();
//       if (response.ok) {
//         setCartItems(data);
//         setCartList(data); // Update global cart context if needed
//       } else {
//         setError(data.error || "Failed to fetch cart");
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//       setError("An unexpected error occurred while fetching the cart.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   return (
//     <div className="">
//       {error && <p className="text-red-500">{error}</p>}
//       <Cart cartItems={cartItems} fetchCart={fetchCart} loading={loading} />
//     </div>
//   );
// };

// export default CarFetch;

import Cart from "@/components/Cart";
import { cookies } from "next/headers";

const fetchCart = async () => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString(); // Get user's cookies
    console.log(cookieHeader);

    console.log("Fetching cart data...");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
      cache: "no-store",
      credentials: "include",
      headers: {
        Cookie: cookieHeader, // Forward cookies
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Cart Fetch Error:", errorData);
      throw new Error(
        `Failed to fetch cart: ${errorData.message || res.status}`
      );
    }

    const data = await res.json();
    console.log("Fetched cart:", data);
    return data;
  } catch (error) {
    console.error("Error in fetchCart:", error);
    return null; // Prevent page crash
  }
};

const CarFetch = async () => {
  const cartItems = await fetchCart(); // Fetch data server-side

  return (
    <div>
      {!cartItems ? (
        <p className="text-red-500">Failed to load cart.</p>
      ) : (
        <Cart cartItems={cartItems} />
      )}
    </div>
  );
};

export default CarFetch;
