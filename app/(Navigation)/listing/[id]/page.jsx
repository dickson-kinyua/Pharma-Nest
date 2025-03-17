import ProductDetails from "@/components/ProductDetails";

export default async function ProductsPage({ params }) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/singleproduct/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch product");
  const data = await res.json();

  return <ProductDetails product={data} />;
}
