// "use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaHeart } from "react-icons/fa";

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
    <Link href={`/listing/${product._id}`} className="p-1">
      <div className="w-full flex flex-col  p-2 sm:text-[14px] hover:scale-105 z-0">
        {/* <div className="w-full h-24 sm:h-40 flex items-center"> */}
        <Image
          src={product.imageUrl}
          alt="Product Image"
          width={500}
          height={400}
          className="w-full sm:w-3/4 md:w-3/4 h-24 sm:h-26 md:h-40 mx-auto"
        />
        {/* </div> */}

        <p className="mt-2 w-full truncate">{product.title}</p>
        <p className="text-blue-500 font-semibold">KSh {product.price}</p>

        {productReviews.length > 0 && (
          <div className="flex gap-1 items-center">
            <div className="flex space-x-2">
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
