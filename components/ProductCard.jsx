"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,
          {
            method: "GET",
            cache: "no-store",
            credentials: "include",
          }
        );
        if (!response.ok) {
          const errorMessage = await response.json();
          console.log(errorMessage);
          return;
        }
        const json = await response.json();
        console.log(json);
        setReviews(json);
      } catch (error) {
        console.log(error);
      }
    }
    fetchReviews();
  }, []);

  const productReviews = reviews.filter(
    (review) => review.productID === product._id
  );

  const reviewsAverage =
    productReviews?.reduce((acc, x) => acc + x.rating, 0) /
    productReviews.length;

  return (
    <Link href={`/listing/${product._id}`} className="bg-blue-50 p-1">
      <div>
        <Image
          src={product.imageUrl}
          alt="Screenshot"
          width={300}
          height={300}
          className="w-full h-[100px] object-cover"
        />
        <p className="mt-2 w-full truncate">{product.title}</p>
        <p className="text-blue-500 font-semibold">KSh {product.price}</p>

        {productReviews.length > 0 && (
          <div className="flex space-x-2 mt-2">
            {[1, 2, 3, 4, 5].map((star, index) => (
              <FaStar
                key={index}
                className={
                  star <= Math.ceil(reviewsAverage)
                    ? "text-yellow-500 cursor-pointer"
                    : "text-gray-300 cursor-pointer"
                }
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
