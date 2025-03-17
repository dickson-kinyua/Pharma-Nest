"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  FiMessageCircle,
  FiMessageSquare,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

const Navigation = () => {
  const pathname = usePathname();
  const [menuStatus, setMenuStatus] = useState(false);

  function toggleMenu() {
    setMenuStatus((s) => !s);
  }

  return (
    <div className="flex justify-between items-center px-4">
      <div className="flex gap-5 items-center">
        <FaBars size={20} onClick={toggleMenu} />
        <p className="font-extrabold text-[18px] uppercase">PharmaNest</p>
      </div>
      <div className="flex gap-6">
        <Link
          href={"/message"}
          className={`${pathname === "/message" ? "text-red-600" : ""}`}
        >
          <FiMessageSquare className="text-[20px]" />
        </Link>
        <Link
          href={"/account"}
          className={`${pathname === "/account" ? "text-red-600" : ""}`}
        >
          <FiUser className="text-[20px]" />
        </Link>
        <Link
          href={"/cart"}
          className={`relative ${pathname === "/cart" ? "text-red-600" : ""}`}
        >
          <FiShoppingCart className="text-[20px]" />
        </Link>
      </div>
      {menuStatus && (
        <div className="absolute top-0 left-[-5px] w-[90%] z-50 text-gray-950 bg-white h-[100vh] p-3">
          <div className="flex gap-9 items-center">
            <FaTimes size={22} onClick={() => setMenuStatus(false)} />
            <p className="font-extrabold text-[18px] uppercase">PharmaNest</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
