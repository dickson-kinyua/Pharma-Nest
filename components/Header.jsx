"use client";

import Link from "next/link";
import Search from "./Search";
import AdBanner from "./adBanner";
import Navigation from "./Navigation";

const Header = () => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <>
      <div className=" flex flex-col gap-4 pb-3">
        <AdBanner />
      </div>
      <div className="bg-[#ffffff] flex flex-col gap-2 py-2 sticky transform-none top-0">
        <Navigation />
        <Search />
      </div>
    </>
  );
};

export default Header;
