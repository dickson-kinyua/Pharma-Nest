export const revalidate = 0; // Disable caching

import Product from "@/models/product";
import { connectDB } from "@/utils/mongodb";
import multer from "multer";
import path from "path";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

export async function GET(req) {
  try {
    await connectDB();
    const products = await Product.find().lean();
    // console.log(products);

    if (!products) {
      return NextResponse.json(
        { error: "No products found!" },
        { status: 400 }
      );
    }

    const serializedProducts = products.map((product) => ({
      ...product,
      _id: product._id.toString(), // Convert MongoDB ObjectId to string
    }));
    // console.log(serializedProducts);
    return NextResponse.json(serializedProducts, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}

// Cloudinary Configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// console.log(process.env.CLOUDINARY_CLOUD_NAME);
// console.log(process.env.CLOUDINARY_API_KEY);
// console.log(process.env.CLOUDINARY_API_SECRET);

const uploadToCloudinary = async (buffer, fileName) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", public_id: fileName },
        (error, result) => {
          if (error) {
            console.error("Upload Error:", error);
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      )
      .end(buffer);
  });
};

export async function POST(req) {
  try {
    await connectDB();

    // Parse FormData
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const category = formData.get("category");
    const imageFile = formData.get("image");

    // console.log(typeof imageFile);

    if (!title || !description || !price || !category || !imageFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!imageFile || typeof imageFile.arrayBuffer !== "function") {
      console.log("invalid file upload");
      return NextResponse.json(
        { error: "Invalid file upload" },
        { status: 400 }
      );
    }
    // Convert image to Buffer
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const fileName = `${Date.now()}-${imageFile.name}`;
    const imageUrl = await uploadToCloudinary(buffer, fileName);

    // Save to MongoDB
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      imageUrl,
    });
    await newProduct.save();

    return NextResponse.json({
      message: "Product uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
