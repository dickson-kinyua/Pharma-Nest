import ProductCard from "./ProductCard";

async function getReviews() {
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

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

const ProductCardWrapper = async ({ product }) => {
  const reviews = await getReviews();

  return <ProductCard product={product} reviews={reviews} />;
};

export default ProductCardWrapper;
