"use client";

import Link from "next/link";
import Search from "./Search";
import Categories from "./Categories";
import { signIn, signOut, useSession } from "next-auth/react";
import BriefUs from "./BriefUs";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className=" fixed top-0 right-2 left-2 bg-[#ffffff] flex flex-col gap-3 pb-3">
      <Link href={"/"} className="text-blue-600 font-extrabold text-xl">
        PharmaNest
      </Link>
      {/* {session ? (
          <>
            <p>
              welcome,{session.user?.name.split(" ").map((name) => name)[0]}
            </p>
            <button onClick={() => signOut()}>Sign Out</button>
          </>
        ) : (
          <button onClick={() => signIn("google")}>Sign In</button>
        )} */}

      <Search />
    </div>
  );
};

export default Header;
