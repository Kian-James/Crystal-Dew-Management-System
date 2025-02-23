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
  quantity: {
    type: Number,
    default: 0,
  },
  transaction_date: {
    type: Date,
    default: () => {
      let date = new Date();
      return new Date(date.setHours(0, 0, 0, 0));
    },
    set: (val) => new Date(new Date(val).setHours(0, 0, 0, 0)),
  },
});

export default mongoose.model("transactions", transactionSchema);
