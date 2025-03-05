import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { generateToken } from "@/utils/auth";
import { connectDB } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "All fields ar required" },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return NextResponse.json(
        { error: "Email not registerd" },
        { status: 401 }
      );
    }

    const verifyPassword = bcrypt.compareSync(password, user.password);

    if (!verifyPassword) {
      return NextResponse.json(
        { error: "incorrect password" },
        { status: 400 }
      );
    }

    const token = generateToken(user);
    console.log(token);

    //setting the token in an HttpOnly cookie
    const response = NextResponse.json({
      message: "Login successfull",
      userInfo: {
        fullName: user.fullName,
        email: user.email,
        userID: user._Id,
      },
    });
    console.log(response);
    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
