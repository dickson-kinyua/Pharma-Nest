"use client";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify";
import { UserCart } from "@/Context/cartContext";
import { useContext, useState } from "react";
import { UserContext } from "@/Context/userContext";
import { useRouter } from "next/navigation";
import ProductInfo from "./ProductInfo";
import Reviews from "./Reviews";
import ProductDescription from "./ProductDescription";
import Recommend from "./Recommend";

const ProductDetails = ({ product }) => {
  const { addToCart } = UserCart();
  const { loggedUser } = useContext(UserContext);
  const router = useRouter();
  const [page, setPage] = useState(1);

  const handleAddToCart = async (productID) => {
    if (!loggedUser) {
      router.push(`/login?redirect=/listing/${productID}`);
      return;
    }

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
      toast.warn(`${data.error}, { autoClose: 1000 }`);
      return;
    }

    toast.success("Successully added to cart", { autoClose: 1000 });
    addToCart(data);
  };

  return (
    <div className="flex flex-col gap-3 p-2 pb-12">
      <div className="flex flex-col gap-3 fixed top-0 right-0 left-0 bg-[white] p-2">
        <Link href={"/"} className="text-xl">
          ↖
        </Link>
        <div className="flex justify-between">
          <button
            onClick={() => setPage(1)}
            className={
              page === 1 ? "text-blue-600 border-b-2 border-blue-500" : ""
            }
          >
            Product
          </button>
          <button
            onClick={() => setPage(2)}
            className={
              page === 2 ? "text-blue-500 border-b-2 border-blue-500" : ""
            }
          >
            Reviews
          </button>
          <button
            onClick={() => setPage(3)}
            className={
              page === 3 ? "text-blue-500 border-b-2 border-blue-500" : ""
            }
          >
            Description
          </button>
          <button
            onClick={() => setPage(4)}
            className={
              page === 4 ? "text-blue-500 border-b-2 border-blue-500 " : ""
            }
          >
            Recommend
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" />
      <div className="mt-16 ">
        {page === 1 && <ProductInfo product={product} />}
        {page === 2 && <Reviews product={product} />}
        {page === 3 && <ProductDescription product={product} />}
        {page === 4 && <Recommend />}
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
