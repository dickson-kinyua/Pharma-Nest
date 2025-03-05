import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { generateToken } from "@/utils/auth";
import { connectDB } from "@/utils/mongodb";
import User from "@/models/userModel";

const salt = bcrypt.genSaltSync(12);

export async function POST(req) {
  await connectDB();
  const { fullName, email, password } = await req.json();
  // console.log(firstName, lastName, email, password);

  if (!fullName || !email || !password) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { error: "User email already registered" },
      { status: 400 }
    );
  }
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUSer = new User({
    fullName,
    email,
    password: hashedPassword,
  });

  await newUSer.save();

  const token = generateToken(newUSer);

  const response = NextResponse.json(
    {
      message: "Registration successful",
      userInfo: { fullName: newUSer.fullName, userId: newUSer._Id },
    },
    {
      status: 201,
    }
  );

  response.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return response;
}
