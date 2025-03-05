import Product from "@/models/product";
import { connectDB } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const id = (await params).id;

    if (!id) {
      return NextResponse.json({ error: "No product ID was provided" });
    }
    const prod = await Product.findById(id);
    if (!prod) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    console.log(prod);
    return NextResponse.json(prod, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
