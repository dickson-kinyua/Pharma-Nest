"use server";

import { connectDB } from "@/utils/mongodb";
import cartModel from "@/models/cartModel";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function addToCartDB(productID) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const userID = decoded.userID;

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

  const plainCart = cart.toObject(); // Convert to plain object
  console.log(plainCart);
  return NextResponse.json({ message: "Item added to cart", cart: plainCart });
}
