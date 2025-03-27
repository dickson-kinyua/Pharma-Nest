import FetchAllProducts from "@/components/FetchAllProducts";
import Search from "@/components/Search";

export const metadata = {
  title: "PharmaNext || Delivering health services o your doorstep",
  description: "Order drugs at the confort of your house",
};

export default async function Home({ searchParams }) {
  const searchParam = await searchParams;
  const query = searchParam?.query || "";
  console.log(query);

  return (
    <div className="px-3 flex flex-col gap-1 bg-[#fffdfd]">
      <div className="w-full sm:hidden sticky top-8 z-[1000]">
        <Search />
      </div>
      <FetchAllProducts />
    </div>
  );
}
