"use client";

import Link from "next/link";
import Image from "next/image";
import ProductsLoadingSkeleton from "@/app/skeletons/productsLoadingSkeleton";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Products = ({ products }) => {
  if (!products) return <ProductsLoadingSkeleton />;
  // console.log(products);
  return products.length > 0 ? (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white pb-14 mt-[125px]">
      {products?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  ) : (
    <div>No Product Found!!</div>
  );
};

export default Products;
