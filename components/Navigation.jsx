"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  FiHeart,
  FiMessageSquare,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import Search from "./Search";
import { FaHome } from "react-icons/fa";

const Navigation = ({ onCartClick }) => {
  const pathname = usePathname();
  const [menuStatus] = useState(false);

  const navs = [
    { title: "Messages", href: "/message", icon: "FiMessageSquare" },
    { title: "Messages", href: "/message", icon: "FiMessageSquare" },
    { title: "Messages", href: "/message", icon: "FiMessageSquare" },
  ];

  return (
    <div className="flex justify-between gap-4 md:gap-6 items-center px-4 text-black md:text-[18px] z-50">
      <div className="flex items-center gap-2 text-black w-fit">
        <Link href={"/"} className="text-xl">
          <FaHome size={22} />
        </Link>
        <p className="font-extrabold text-[16px] md:text-3xl uppercase ">
          PharmaNest
        </p>
      </div>
      <div className="hidden sm:block flex-grow z-40">
        <Search />
      </div>
      <div className="flex gap-4 sm:gap-4 md:gap-5">
        <Link
          href={"/message"}
          className={`flex gap-1 items-center ${
            pathname === "/message" ? "text-red-600" : ""
          }`}
        >
          <FiMessageSquare className="text-[18px] sm:text-[20px]" />
          <span className="hidden md:block">Messages</span>
        </Link>
        <Link
          href={"/favourites"}
          className={`flex gap-1 items-center ${
            pathname === "/favourites" ? "text-red-600" : ""
          }`}
        >
          <FiHeart className="text-[18px] sm:text-[20px]" />
          <span className="hidden md:block">Favourites</span>
        </Link>
        <Link
          href={"/account"}
          className={`flex gap-1 items-center ${
            pathname === "/account" ? "text-red-600" : ""
          }`}
        >
          <FiUser className="text-[18px] sm:text-[20px]" />
          <span className="hidden md:block">Account</span>
        </Link>
        <button
          onClick={onCartClick}
          className={`relative flex gap-1 items-center ${
            pathname === "/cart" ? "text-red-600" : ""
          }`}
        >
          <FiShoppingCart className="text-[18px] sm:text-[20px]" />
          <span className="hidden md:block">Cart</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
