"use client";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserCart } from "@/Context/cartContext";
import { useContext, useState } from "react";
import { UserContext } from "@/Context/userContext";
import { useRouter } from "next/navigation";
import ProductInfo from "./ProductInfo";
import Reviews from "./Reviews";
import ProductDescription from "./ProductDescription";

import { FaShoppingCart } from "react-icons/fa";

const TABS = [
  { id: 1, label: "Product Info", component: ProductInfo },
  { id: 2, label: "Reviews", component: Reviews },
  { id: 3, label: "Description", component: ProductDescription },
];

const ProductDetails = ({ product }) => {
  const { addToCart } = UserCart();
  const { loggedUser } = useContext(UserContext);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);

  const handleAddToCart = async (productID) => {
    if (!loggedUser) {
      router.push(`/login?redirect=/listing/${productID}`);
      return;
    }
    if (!product || !product._id) return;
    const response = await fetch(
      ` ${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
      {
        method: "POST",
        body: JSON.stringify({ productID }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        cache: "no-store",
      }
    );
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      toast.warn(data.error, { autoClose: 1000 });
      return;
    }
    toast.success("Successully added to cart", { autoClose: 1000 });
    addToCart(data);
  };

  const ActiveComponent = TABS.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className="flex flex-col gap-3 p-2 pb-12">
      <div className="flex flex-col gap-3 bg-[white] p-2">
        <div className="flex justify-between sm:justify-center gap-7">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={
                activeTab === id
                  ? "text-blue-600 border-b-2 font-bold border-blue-600"
                  : ""
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <ToastContainer position="top-right" />
      <div>{ActiveComponent && <ActiveComponent product={product} />}</div>

      <div className="fixed md:relative z-20 left-0 p-2 bg-slate-50 bottom-0 w-full">
        <button
          className="rounded p-3 sm:p-2 bg-blue-500  text-white w-full sm:w-fit text-sm flex items-center gap-3 justify-center"
          onClick={() => handleAddToCart(product._id)}
        >
          <FaShoppingCart />
          Add to cart ↗
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
