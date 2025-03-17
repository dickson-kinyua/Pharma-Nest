"use client";
import Header from "@/components/Header";
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
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default WithNavbarLayout;
