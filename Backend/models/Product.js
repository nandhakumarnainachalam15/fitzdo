import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: String,
    brand: String,
    description: String,
    price: Number,
    rating: Number,
    images: [String],
    specs: Object,
    sponsored: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
