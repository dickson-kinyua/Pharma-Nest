// "use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ product, reviews = [] }) => {
  const productReviews = reviews.filter(
    (review) => review.productID === product._id
  );

  // Compute average rating
  const reviewsAverage =
    productReviews.length > 0
      ? productReviews.reduce((acc, x) => acc + x.rating, 0) /
        productReviews.length
      : 0;

  return (
    <Link href={`/listing/${product._id}`} className="p-1 z-0">
      <div className="flex flex-col max-w-1/2 py-2 sm:text-[14px] hover:scale-105 relative bg-gray-100 p-1">
        <Image
          src={product.imageUrl}
          alt="Product Image"
          width={500}
          height={300}
          className="mx-auto sm:w-3/4 md:w-3/4 h-20 sm:h-16 md:h-40"
        />

        <p className="mt-2 w-full truncate">{product.title}</p>
        <p className="text-blue-500 font-semibold">KSh {product.price}</p>

        {productReviews.length > 0 && (
          <div className="flex gap-1 items-center">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star, index) => (
                <FaStar
                  key={index}
                  className={
                    star <= Math.ceil(reviewsAverage)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <p>({productReviews.length})</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
