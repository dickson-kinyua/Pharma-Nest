"use client";

import AdBanner from "./adBanner";
import Navigation from "./Navigation";

const Header = ({ onCartClick }) => {
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
      <div className="bg-[#ffffff] flex flex-col gap-2 py-2 sticky transform-none top-0 z-[1000]">
        <Navigation onCartClick={onCartClick} />
      </div>
    </>
  );
};

export default Header;
