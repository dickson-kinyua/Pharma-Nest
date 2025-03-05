import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";
import User from "@/models/userModel";
import { connectDB } from "@/utils/mongodb";

export async function GET(req) {
  await connectDB();
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ message: "invalid token" }, { status: 401 });
  }

  const user = await User.findById(decoded.userID).select("-password");
  // console.log(user);
  return NextResponse.json(user);
}
