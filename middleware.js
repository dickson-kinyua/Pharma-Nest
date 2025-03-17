import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { verifyToken } from "./utils/auth";
import { cookies } from "next/headers";

export async function middleware(req) {
  const { nextUrl } = req;
  const cookieStore = await cookies();
  const tokenFromCookie = cookieStore.get("token")?.value;
  console.log("Middleware: JWT Token:", tokenFromCookie);

  // Check NextAuth session
  const nextAuthToken = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("Middleware: NextAuth Token:", nextAuthToken);

  if (nextAuthToken) return NextResponse.next();

  // Check JWT token from cookies
  if (tokenFromCookie) {
    try {
      const decoded = await verifyToken(tokenFromCookie);
      if (decoded?.userID) return NextResponse.next();
    } catch (error) {
      console.error("JWT verification failed", error);
    }
  }

  // Preserve original path in query params
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("redirect", nextUrl.pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/cart/:path*", "/account/:path*"], // Ensures middleware runs on these routes
  runtime: "nodejs", // ✅ This ensures it runs on Node.js instead of Edge
};
