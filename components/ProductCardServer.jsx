import ProductCard from "./ProductCard";

const ProductCardServer = async ({ product }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/reviews?productID=${product._id}`,
    {
      cache: "no-store",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorMessage = await response.json();
    console.log(errorMessage);
    return;
  }

  const reviews = await response.json();
  console.log(reviews);

  return <ProductCard product={product} reviews={reviews} />;
};

export default ProductCardServer;
