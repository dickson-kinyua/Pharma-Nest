// "use client";

import Products from "./products";

export default async function FetchAllProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  if (!res.ok) throw new Error();
  const products = await res.json();
  console.log(products);

  return <Products products={products} />;
}
