// "use client";

import ProductsLoadingSkeleton from "@/app/skeletons/productsLoadingSkeleton";
import ProductCardServer from "./ProductCardServer";

const Products = ({ products }) => {
  if (!products) return <ProductsLoadingSkeleton />;
  // console.log(products);
  return products.length > 0 ? (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white pb-14">
      {products?.map((product) => (
        <ProductCardServer key={product._id} product={product} />
      ))}
    </div>
  ) : (
    <div>No Product Found!!</div>
  );
};

export default Products;
