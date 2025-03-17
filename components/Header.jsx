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
    <div className="fixed top-0 left-0 right-0 bg-[#ffffff] flex flex-col gap-3 pb-3">
      <AdBanner />
      <Navigation />
      <Search />
    </div>
  );
};

export default Header;
