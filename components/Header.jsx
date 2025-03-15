"use client";

import Link from "next/link";
import Search from "./Search";
import AdBanner from "./adBanner";

const Header = () => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className=" fixed top-0 right-3 pt-3 left-3 bg-[#ffffff] flex flex-col gap-3 pb-3">
      <AdBanner />
      <Search />
    </div>
  );
};

export default Header;
