import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "@/utils/mongodb";
import cartModel from "@/models/cartModel";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Function to get user from JWT or NextAuth
async function getUser() {
  // 1.Try getting the user from NextAuth session
  const session = await getServerSession(authOptions);
  if (session?.user?.userID) {
    return session.user.userID;
  }

  // 2. Try getting the user from JWT cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token) {
    try {
      const decoded = verifyToken(token);
      return decoded.userID; // Ensure JWT contains.userID
    } catch (error) {
      console.error("JWT verification failed", error);
    }
  }

  return null;
}

//Remove item from cart
export async function DELETE(req) {
  await connectDB();

  const userID = await getUser();
  if (!userID) {
    return NextResponse.json({ error: "Access denied" }, { status: 401 });
  }

  const { productID } = await req.json();
  if (!mongoose.Types.ObjectId.isValid(productID)) {
    return NextResponse.json(
      { message: "Invalid product ID format" },
      { status: 400 }
    );
  }

  const cart = await cartModel.updateOne(
    { userID },
    { $pull: { items: { productId: productID } } },
    { new: true }
  );

  return NextResponse.json({ message: "Deleted successfully" });
}

// Add item to cart
export async function POST(req) {
  await connectDB();

  const userID = await getUser();
  // console.log(userEmail);
  if (!userID) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { productID } = await req.json();

  console.log(productID);
  console.log(userID);
  if (!mongoose.Types.ObjectId.isValid(productID)) {
    return NextResponse.json(
      { message: "Invalid product ID format" },
      { status: 400 }
    );
  }
  let cart = await cartModel.findOne({ userID });

  if (!cart) {
    cart = new cartModel({
      userID,
      items: [{ productId: productID, quantity: 1 }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productID
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ productId: productID, quantity: 1 });
    }
  }

  await cart.save();
  return NextResponse.json(
    { message: "Item added to cart", cart },
    { status: 201 }
  );
}

// Fetch user’s cart
export async function GET(req) {
  await connectDB();

  const userID = await getUser();
  if (!userID) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const cart = await cartModel.findOne({ userID }).populate("items.productId");
  return NextResponse.json(cart ? cart.items : []);
}
