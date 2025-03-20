"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify";
import OrderSummary from "./orderSummary";
import CartItem from "./CartItem";
import { useLoggedUser } from "@/Context/userContext";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const Cart = ({ cartItems, fetchCart, loading }) => {
  const { loggedUser } = useLoggedUser();

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-28">
        <div className="animate-pulse flex items-center justify-center  border-2 border-blue-500 font-bold">
          <div className="fixed top-0 left-0 bg-black opacity-40 h-[100vh] w-full"></div>
          <p>PharmaNest</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-2 pb-20">
      <ToastContainer position="top-right" />
      <form className="bg-blue-500 p-2 text-white">
        <label htmlFor="file" className="font-bold">
          Upload an image for your prescription
        </label>
        <input type="file" id="file" />
      </form>
      {cartItems?.length === 0 ? (
        <div className="w-full mt-10 flex flex-col gap-2 items-center">
          <FaShoppingCart size={40} />
          <p className="font-bold">Your cart is currently empty!</p>
          <p className="text-center">
            Click below to start shoping and grab what you need!
          </p>
          <Link
            href={"/"}
            className="w-full bg-blue-500 text-white block mt-5 p-2 text-center font-semibold"
          >
            Start Shopping
          </Link>
        </div>
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
