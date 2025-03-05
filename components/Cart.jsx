"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify";
import OrderSummary from "./orderSummary";
import CartItem from "./CartItem";
import LoginPage from "@/app/(Others)/login/page";
import { useLoggedUser } from "@/Context/userContext";
import { useRouter } from "next/navigation";

const Cart = ({ cartItems, fetchCart, loading }) => {
  const router = useRouter();

  const { loggedUser, setLoggedUser } = useLoggedUser();
  const { session, status } = useSession(); // Get session data

  useEffect(() => {
    if (session?.user && !loggedUser) {
      setLoggedUser(session.user);
    }
  }, [session, loggedUser, setLoggedUser]);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/cart"); // ✅ Ensures immediate navigation without history stack issues
    }
  }, [status, router]);

  // Calculate totals
  const subTotal = cartItems?.reduce(
    (acc, cur) => acc + cur.productId.price * cur.quantity,
    0
  );
  const shippingFee = 0.05 * subTotal;
  const total = subTotal + shippingFee;

  async function handleDelete(productID) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
        {
          method: "DELETE",
          credentials: "include",
          body: JSON.stringify({ productID }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      toast.success(`${data.message}`, { autoClose: 1000 });
      fetchCart();
    } catch (error) {
      console.error("Request failed", error);
    }
  }

  // If session is still loading
  if (status === "loading" && !loggedUser) return <p>Loading...</p>;

  // If no user is logged in
  if (!loggedUser?.email) return <LoginPage />;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-28">
        <div className="animate-spin h-5 w-5 rounded-full border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-2 pb-20">
      <ToastContainer position="top-right" />
      <h1 className="text-xl font-bold mb-4">
        {session?.user &&
          ` Hi,${session.user?.name.split(" ")[0]}! Your cart is here`}
        {loggedUser?.fullName &&
          ` Hi,${loggedUser?.fullName.split(" ")[0]}! Your cart is here`}
      </h1>
      <form className="bg-blue-500 p-2 text-white">
        <label htmlFor="file" className="font-bold">
          Upload an image for your prescription
        </label>
        <input type="file" id="file" />
      </form>
      {cartItems?.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="flex flex-col gap-1">
            {cartItems?.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
          <OrderSummary
            subTotal={subTotal}
            total={total}
            shippingFee={shippingFee}
          />
        </>
      )}
    </div>
  );
};

export default Cart;
