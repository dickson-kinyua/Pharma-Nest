"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { UserCart } from "@/Context/cartContext";
import {
  FaHome,
  FaShoppingCart,
  FaRegCommentDots,
  FaUser,
  FaRegHeart,
} from "react-icons/fa";

const WithNavbarLayout = ({ children }) => {
  const pathname = usePathname();
  // const { cartList } = UserCart();

  return (
    <div>
      <div>{children}</div>
      <ul className="w-full fixed bottom-0 flex flex-row justify-between py-2 px-3 bg-slate-50">
        <Link
          href={"/"}
          className={`${pathname === "/" ? "text-red-600" : ""}`}
        >
          <li className="flex flex-col items-center">
            {" "}
            <FaHome className="text-[20px]" />
            Home
          </li>
        </Link>

        <Link
          href={"/message"}
          className={`relative ${
            pathname === "/message" ? "text-red-600" : ""
          }`}
        >
          <li className="flex flex-col items-center">
            <FaRegCommentDots className="text-[20px]" /> Message
          </li>
        </Link>
        <Link
          href={"/favourites"}
          className={`relative ${
            pathname === "/favourites" ? "text-red-600" : ""
          }`}
        >
          <li className="flex flex-col items-center">
            <FaRegHeart className="text-[20px]" />
            Favorites
          </li>
        </Link>
        <Link
          href={"/cart"}
          className={`relative ${pathname === "/cart" ? "text-red-600" : ""}`}
        >
          <li className="flex flex-col items-center">
            <FaShoppingCart className="text-[20px]" /> Cart
          </li>
        </Link>
        <Link
          href={"/account"}
          className={`${pathname === "/account" ? "text-red-600" : ""}`}
        >
          <li className="flex flex-col items-center">
            <FaUser className="text-[20px]" /> Account
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default WithNavbarLayout;
