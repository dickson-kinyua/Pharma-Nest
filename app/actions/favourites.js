"use server";

import { connectDB } from "@/utils/mongodb";
import { getUser } from "@/utils/authorizeUser";
import { NextResponse } from "next/server";
import Favorite from "@/models/favorites";

export const toggleFavorites = async (id) => {
  try {
    await connectDB();
    console.log("id from server action", id);
    const userID = await getUser();

    if (!userID) {
      return NextResponse.json({ error: "Access denied" });
    }
    const isFavorited = await Favorite.findOne({ user: userID, product: id });

    if (isFavorited) {
      await Favorite.findByIdAndDelete(isFavorited._id);
    } else {
      await Favorite.create({
        user: userID,
        product: id,
      });
    }
    consoole.log("added");
    return await getFavorites();
  } catch (error) {
    return NextResponse.json({ error: "internal server error" });
  }
};

export async function getFavorites() {
  await connectDB();
  const userID = await getUser();
  if (!userID) {
    return NextResponse.json({ error: "access denied" });
  }

  const favorites = await Favorite.find({ user: userID }).select("product");

  return favorites;
}
