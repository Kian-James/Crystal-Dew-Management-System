import mongoose, { mongo } from "mongoose";
import SequenceFactory from "mongoose-sequence";
const AutoIncrement = SequenceFactory(mongoose);

const pendingTransactionSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    unique: true,
  },
  pending_id: {
    type: Number,
    unique: true,
  },
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

pendingTransactionSchema.plugin(AutoIncrement, { inc_field: "pending_id" });
pendingTransactionSchema.plugin(AutoIncrement, { inc_field: "order_id" });

export default mongoose.model("pending-transactions", pendingTransactionSchema);
