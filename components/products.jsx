"use client";

import Link from "next/link";
import Image from "next/image";

const Products = ({ products }) => {
  return products.length > 1 ? (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-2 pb-14 mt-24">
      {products?.map((product) => (
        <div className="flex flex-col gap-1" key={product._id}>
          <Link href={`/listing/${product._id}`} className="bg-blue-50 p-1">
            <div>
              <Image
                src={product.imageUrl}
                alt="Screenshot"
                height={100}
                width={200}
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
