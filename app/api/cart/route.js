import { connectDB } from "@/utils/mongodb";
import cartModel from "@/models/cartModel";

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { getUser } from "@/utils/authorizeUser";

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
  try {
    await connectDB();

    const userID = await getUser();
    console.log("Retrieved user ID:", userID);
    if (!userID) {
      console.log("User not authenticated");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { productID } = await req.json();
    console.log("Retrieved product ID:", productID);

    if (!mongoose.Types.ObjectId.isValid(productID)) {
      console.log("Invalid product ID format");
      return NextResponse.json(
        { message: "Invalid product ID format" },
        { status: 400 }
      );
    }

    // Validate userID and productID
    if (!userID || !productID) {
      console.log("Missing userID or productID");
      return NextResponse.json(
        { message: "Missing userID or productID" },
        { status: 400 }
      );
    }

    let cart = await cartModel.findOne({ userID });
    console.log("Cart retrieved:", cart);
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

    // Validate cart before saving
    if (cart.userID && cart.items.length > 0) {
      await cart.save();
      revalidatePath("/api/cart");
      console.log("Item added to cart", cart);
      return NextResponse.json(
        { message: "Item added to cart", cart },
        { status: 201 }
      );
    } else {
      console.log("Invalid cart data");
      return NextResponse.json(
        { message: "Invalid cart data" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Internal server error", error);
    return NextResponse.json(
      { error: "Internal server error", error },
      { status: 500 }
    );
  }
}
// Fetch user’s cart
export async function GET(req) {
  await connectDB();
  console.log("Headers received in API:", req.headers);
  const userID = await getUser();
  console.log("cart userID", userID);
  if (!userID) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const cart = await cartModel.findOne({ userID }).populate("items.productId");
  return NextResponse.json(cart ? cart.items : []);
}
