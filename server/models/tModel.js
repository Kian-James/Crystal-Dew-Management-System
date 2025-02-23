import mongoose, { mongo } from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true,
      trim: true,
    },
    customer_address: {
      type: String,
      required: true,
    },
    phone_no: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("transactions", transactionSchema);
