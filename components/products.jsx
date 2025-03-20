// "use client";

import ProductsLoadingSkeleton from "@/app/skeletons/productsLoadingSkeleton";
import ProductCardServer from "./ProductCardServer";

const Products = ({ products }) => {
  if (!products) return <ProductsLoadingSkeleton />;
  // console.log(products);
  return products.length > 0 ? (
    <div className="bg-white md:bg-blue-600 w-full">
      <div className="bg-white grid grid-cols-2 sm:grid-cols-3 mt-5 md:grid-cols-4 gap-3  pb-14 md:w-4/5 md:mx-auto">
        {products?.map((product) => (
          <ProductCardServer key={product._id} product={product} />
        ))}
      </div>
    </div>
  ) : (
    <div>No Product Found!</div>
  );
};

export default Products;
