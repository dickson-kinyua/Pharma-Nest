import { connectDB } from "@/utils/mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { verifyToken } from "@/utils/auth";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Access denied" });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: "invalid token" });
    }

    const userID = decoded.userID;
    // console.log(userID);
    const userToUpdate = await User.findById(userID);
    console.log(userToUpdate);

    const { oldPassword, newPassword } = await req.json();
    console.log(oldPassword, newPassword);

    const passwordMatch = bcrypt.compareSync(
      oldPassword,
      userToUpdate.password
    );
    if (!passwordMatch) {
      return NextResponse.json({ error: "Password incorrect!" });
    }

    console.log(passwordMatch);

    return NextResponse.json({ message: "hello" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
