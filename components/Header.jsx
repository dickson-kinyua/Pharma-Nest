"use client";

import Link from "next/link";
import Search from "./Search";

const Header = () => {
  return (
    <div className=" fixed top-0 right-2 left-2 bg-[#ffffff] flex flex-col gap-3 pb-3">
      <Link href={"/"} className="text-blue-600 font-extrabold text-xl">
        PharmaNest
      </Link>

      <Search />
    </div>
  );
};

export default Header;
