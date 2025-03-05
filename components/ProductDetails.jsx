"use client";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify";
import { UserCart } from "@/Context/cartContext";

const ProductDetails = ({ product }) => {
  const { addToCart } = UserCart();

  const handleAddToCart = async (productID) => {
    console.log(productID);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
      {
        method: "POST",
        body: JSON.stringify({ productID }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      // console.log(data);
      toast.warn(`${data.error}`, { autoClose: 1000 });
      return;
    }

    toast.success("Successully added to cart", { autoClose: 1000 });
    addToCart(data);
  };

  return (
    <div className="flex flex-col gap-3 p-2 pb-12">
      <ToastContainer position="top-right" />
      <div className="flex justify-between sticky top-0 bg-[white] p-2">
        <Link href={"/"} className="underline">
          ↖Back
        </Link>
        <Link href={"/cart"} className="underline">
          View 🛒
        </Link>
      </div>
      <div className="w-full flex items-center justify-center p-5 bg-slate-300">
        <Image
          src={product?.imageUrl}
          width={270}
          height={148}
          alt="product"
        ></Image>
      </div>
      <p className="text-sm text-blue-600 font-bold">Shopping</p>

      <p className="font-bold text-xl">{product?.title}</p>
      <p className="font-bold text-xl">KSh {product?.price}</p>
      <div>
        <p>Product information</p>

        <p>{product?.description}</p>
      </div>
      <button
        className="rounded-xl text-blue-500 w-fit text-sm"
        onClick={() => handleAddToCart(product._id)}
      >
        Add to cart ↗
      </button>
    </div>
  );
};

export default ProductDetails;
