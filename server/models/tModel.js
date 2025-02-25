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
    default: () => {
      const date = new Date();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const yyyy = date.getFullYear();
      return `${mm}/${dd}/${yyyy}`;
    },
  },
});

export default mongoose.model("transactions", transactionSchema);
