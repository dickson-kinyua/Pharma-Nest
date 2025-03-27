"use client";
import Image from "next/image";

import { FaRegHeart } from "react-icons/fa";
import { useEffect } from "react";

import { getFavorites, toggleFavorites } from "@/app/actions/favourites";

const ProductInfo = ({ product }) => {
  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const favs = getFavorites();
        console.log(favs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavs();
  }, []);

  async function addToFav(id) {
    try {
      toggleFavorites(id);
    } catch (error) {
      console.log("Error adding to favorites", error);
    }
  }

  return (
    <div className="z-0 flex flex-col sm:flex-row gap-2">
      <div className="w-full  sm:w-1/4 md:w-1/4 relative h-28 md:h-72 flex items-center justify-center bg-slate-300">
        <Image src={product?.imageUrl} fill alt="product"></Image>
      </div>
      <button
        className="absolute right-3"
        onClick={() => addToFav(product._id)}
      >
        {<FaRegHeart size={18} />}
      </button>
      <div>
        <p className="text-sm text-blue-600 font-bold">Shopping</p>

        <p className="font-bold">{product?.title}</p>
        <p className="font-bold">KSh {product?.price}</p>
        <p>in {product.category}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
