"use client";

import Link from "next/link";
import Image from "next/image";

const Products = ({ products }) => {
  console.log(products);
  return products.length > 0 ? (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white pb-14 mt-24">
      {products?.map((product) => (
        <div className="flex flex-col gap-1" key={product._id}>
          <Link href={`/listing/${product._id}`} className="bg-blue-50 p-1">
            <div>
              <Image
                src={product.imageUrl}
                alt="Screenshot"
                width={300}
                height={300}
                className="w-full h-[100px] object-cover"
              />
              <p>{product.title}</p>
              <p>KSh {product.price}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <div>No Product Found!!</div>
  );
};

export default Products;
