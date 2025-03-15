import { models, model, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Array of review IDs
  },
  {
    timestamps: true,
  }
);
const Product = models.Product || new model("Product", ProductSchema);

export default Product;
