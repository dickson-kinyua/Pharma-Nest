"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCart } from "@/Context/cartContext";

const WithNavbarLayout = ({ children }) => {
  const pathname = usePathname();
  const { cartList } = UserCart();

  return (
    <div>
      <div>{children}</div>
      <ul className="w-full fixed bottom-0 flex flex-row justify-between p-5 bg-slate-50">
        <Link
          href={"/"}
          className={`${pathname === "/" ? "text-red-600" : ""}`}
        >
          <li>Home</li>
        </Link>

        <Link
          href={"/cart"}
          className={`relative ${pathname === "/cart" ? "text-red-600" : ""}`}
        >
          <li>Cart</li>
          <p className="absolute flex items-end justify-center top-[-14px] right-[-24px]  bg-gray-800 h-6 w-6 rounded-full text-sm text-white">
            {cartList?.length}
          </p>
        </Link>
        <Link
          href={"/account"}
          className={`${pathname === "/account" ? "text-red-600" : ""}`}
        >
          <li>Account</li>
        </Link>
      </ul>
    </div>
  );
};

export default WithNavbarLayout;
