import Product from "@/models/product";
import { connectDB } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    //extract query parameter
    const query = req.nextUrl.searchParams.get("q") || "";
    console.log("Search query:", query);

    if (!query) {
      return NextResponse.json([], { status: 400 });
    }
    // Search MongoDB with regex
    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Case-insensitive search
        { description: { $regex: query, $options: "i" } },
      ],
    });

    if (!products) {
      return NextResponse.json(null, { status: 200 });
    }
    return NextResponse.json(products, { status: 201 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}
