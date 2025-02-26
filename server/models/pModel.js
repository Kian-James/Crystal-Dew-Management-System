import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
    trim: true,
  },
  product_cost: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("products", productSchema);
