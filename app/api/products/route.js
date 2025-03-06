import Product from "@/models/product";
import { connectDB } from "@/utils/mongodb";
import multer from "multer";
import path from "path";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";

export async function GET(req) {
  try {
    await connectDB();
    //extract query parameter
    // const query = req.nextUrl.searchParams.get("query") || "";
    // console.log("Search query:", query);
    // Search MongoDB with regex
    // const products = await Product.find({
    //   $or: [
    //     { title: { $regex: query, $options: "i" } }, // Case-insensitive search
    //     { description: { $regex: query, $options: "i" } },
    //   ],
    // });
    // Convert _id to string

    const products = await Product.find().lean();

    const serializedProducts = products.map((product) => ({
      ...product,
      _id: product._id.toString(), // Convert MongoDB ObjectId to string
    }));
    return NextResponse.json(serializedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}

// Multer Configuration: Store file in memory before processing
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware-like function to handle file uploads
const processFile = async (req) => {
  return new Promise((resolve, reject) => {
    upload.single("image")(req, {}, (err) => {
      if (err) reject(err);
      resolve(req.file);
    });
  });
};

export async function POST(req) {
  try {
    await connectDB();

    // Parse form data
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const category = formData.get("category");
    const imageFile = formData.get("image");

    if (!title || !description || !price || !category || !imageFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Convert image to Buffer
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "products" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    // Save product to MongoDB
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      imageUrl: uploadResponse.secure_url, // Cloudinary URL
    });
    await newProduct.save();

    return NextResponse.json({
      message: "Product uploaded successfully",
      imageUrl: uploadResponse.secure_url,
    });
  } catch (error) {
    console.error("Error uploading product", error);
    return NextResponse.json(
      { message: "Error uploading product" },
      { status: 500 }
    );
  }
}
