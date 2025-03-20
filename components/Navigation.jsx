"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { FaBars, FaHome, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

import {
  FiHeart,
  FiMessageCircle,
  FiMessageSquare,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

const Navigation = ({ onCartClick }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const [menuStatus, setMenuStatus] = useState(false);

  function toggleMenu() {
    setMenuStatus((s) => !s);
  }

  return (
    <div className="flex justify-between items-center px-4 text-black">
      <div className="flex items-center text-black  ">
        <Link href={"/"} className="text-xl">
          <FaHome size={22} />
        </Link>
        <p className="font-extrabold text-[16px] uppercase ">PharmaNest</p>
      </div>
      <div className="flex gap-4">
        <Link
          href={"/message"}
          className={`${pathname === "/message" ? "text-red-600" : ""}`}
        >
          <FiMessageSquare className="text-[18px]" />
        </Link>
        <Link
          href={"/favourites"}
          className={`${pathname === "/favourites" ? "text-red-600" : ""}`}
        >
          <FiHeart className="text-[18px]" />
        </Link>
        <Link
          href={"/account"}
          className={`${pathname === "/account" ? "text-red-600" : ""}`}
        >
          <FiUser className="text-[18px]" />
        </Link>
        <button
          onClick={onCartClick}
          className={`relative ${pathname === "/cart" ? "text-red-600" : ""}`}
        >
          <FiShoppingCart className="text-[18px]" />
        </button>
        {/* <Link
          href={"/cart"}
          className={`relative ${pathname === "/cart" ? "text-red-600" : ""}`}
        >
          <FiShoppingCart className="text-[18px]" />
        </Link> */}
      </div>
      {menuStatus && (
        <>
          <div className="fixed top-0 left-[-5px] w-[90%] z-50 text-gray-950 bg-blue-50 h-[100vh] p-3 overflow-hidden">
            <div className="flex gap-9 items-center">
              <p className="font-extrabold text-[18px] uppercase">PharmaNest</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navigation;
