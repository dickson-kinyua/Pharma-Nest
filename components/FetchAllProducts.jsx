import Products from "./products";

export default async function FetchAllProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      cache: "no-store", // Ensure fresh data
    });

    if (!res.ok) {
      const errorText = await res.json();
      console.error("Fetch Error:", res.status, errorText);
      // throw new Error(`Error fetching products: ${res.status} - ${errorText}`);
    }

    const products = await res.json();
    return <Products products={products} />;
  } catch (error) {
    console.error("Unexpected Error:", error);
    return <div>Error loading products. Please try again later.</div>;
  }
}
