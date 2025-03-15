"use client";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserCart } from "@/Context/cartContext";
import { useContext, useState } from "react";
import { UserContext } from "@/Context/userContext";
import { useRouter } from "next/navigation";
import ProductInfo from "./ProductInfo";
import Reviews from "./Reviews";
import ProductDescription from "./ProductDescription";
import Recommend from "./Recommend";

const TABS = [
  { id: 1, label: "Product Info", component: ProductInfo },
  { id: 2, label: "Reviews", component: Reviews },
  { id: 3, label: "Description", component: ProductDescription },
  { id: 4, label: "Recommend", component: Recommend },
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

    // console.log(productID);

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
      // console.log(data);
      toast.warn(data.error, { autoClose: 1000 });
      return;
    }

    toast.success("Successully added to cart", { autoClose: 1000 });
    addToCart(data);
  };

  const ActiveComponent = TABS.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className="flex flex-col gap-3 p-2 pb-12">
      <div className="flex flex-col gap-3 fixed top-0 right-0 left-0 bg-[white] p-2">
        <Link href={"/"} className="text-xl">
          ↖
        </Link>
        <div className="flex justify-between">
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
      <div className="mt-16 ">
        {ActiveComponent && <ActiveComponent product={product} />}
      </div>

      <div className="fixed left-0 p-2 bg-slate-50 bottom-0 w-full  flex justify-between">
        <button
          className="rounded-xl text-blue-500 w-fit text-sm"
          onClick={() => handleAddToCart(product._id)}
        >
          Add to cart ↗
        </button>

        <Link href={"/cart"} className="underline block">
          View 🛒
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
