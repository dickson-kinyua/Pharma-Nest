import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/famastoNext3" || "";

if (!MONGODB_URI) {
  throw new Error("Please provide a mongob connection URI");
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to the database");
      return;
    }

    const db = await mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    });

    console.log("Connected to the database");
    return db;
  } catch (error) {
    console.error(error);
  }
};
