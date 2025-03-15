import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongodb";
import Review from "@/models/reviews";
import Product from "@/models/product";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUser } from "@/utils/authorizeUser";

export async function POST(req) {
  await connectDB();

  const userID = await getUser();
  console.log("userId extracted", userID);

  const { productID, review, rating } = await req.json();
  // console.log(productID, review, rating);
  if (!productID || !review || !rating) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    // Create a new review
    const newReview = await Review.create({
      productID,
      userID,
      review,
      rating,
    });

    // Add review ID to the corresponding product
    // await Product.findByIdAndUpdate(productID, {
    //   $push: { reviews: newReview._id },
    // });

    return NextResponse.json(
      { message: "Review submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await connectDB();

  // const userID = await getUser();
  // if (!userID) {
  //   return NextResponse.json({ error: "Access denied" }, { status: 400 });
  // }

  const { searchParams } = new URL(req.url);
  const productID = searchParams.get("id");
  console.log("get Reviews prodID", productID);

  if (!productID) {
    const reviews = await Review.find().populate("userID", "fullName"); // Fetch reviews with user info
    return NextResponse.json(reviews, { status: 200 });
  }

  try {
    const reviews = await Review.find({ productID }).populate(
      "userID",
      "fullName"
    ); // Fetch reviews with user info
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
