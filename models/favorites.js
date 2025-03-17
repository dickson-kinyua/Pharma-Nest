import mongoose, { model, models, Schema } from "mongoose";

const favoriteSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

const Favorite = models.Favorite || model("Favorite", favoriteSchema);

export default Favorite;
