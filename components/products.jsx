// "use client";

import ProductsLoadingSkeleton from "@/app/skeletons/productsLoadingSkeleton";
import ProductCardServer from "./ProductCardServer";

const Products = ({ products }) => {
  if (!products) return <ProductsLoadingSkeleton />;

  const categories = [...new Set(products?.map((product) => product.category))];
  // console.log(categories);
  return products.length > 0 ? (
    <div className="bg-white md:bg-blue-600 z-0">
      {categories.map((category) => (
        <div key={category}>
          <p className="uppercase font-semibold my-4 bg-blue-600 text-white p-1">
            {category} CATEGORY
          </p>
          <div className="bg-white grid grid-cols-2 gap-2 md:w-4/5 md:mx-auto">
            {products
              ?.filter((prod) => prod.category === category)
              .map((product) => (
                <ProductCardServer key={product._id} product={product} />
              ))}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>No Product Found!</div>
  );
};

export default Products;
