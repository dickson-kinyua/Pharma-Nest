import FetchAllProducts from "@/components/FetchAllProducts";
import Search from "@/components/Search";

export const metadata = {
  title: "PharmaNext || Delivering health services o your doorstep",
  description: "Order drugs at the conform of your house",
};

export default async function Home({ searchParams }) {
  const searchParam = await searchParams;
  const query = searchParam?.query || "";
  console.log(query);

  return (
    <div className="px-3 flex flex-col gap-1 bg-[#fffdfd]">
      <Search />
      <FetchAllProducts />
    </div>
  );
}
