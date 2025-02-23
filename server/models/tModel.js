import mongoose, { mongo } from "mongoose";

const transactionSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
    trim: true,
  },
  customer_address: {
    type: String,
    required: true,
  },
  customer_phone: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  total_price: {
    type: Number,
    default: 0,
  },
  transaction_date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
});

export default mongoose.model("transactions", transactionSchema);
