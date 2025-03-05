import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Expire the JWT cookie by setting it to an empty value and an immediate expiration
  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // Expire immediately
    path: "/", // Ensure it's removed for all routes
  });

  return response;
}
