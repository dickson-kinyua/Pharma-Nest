import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token || !verifyToken(token)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"],
};
