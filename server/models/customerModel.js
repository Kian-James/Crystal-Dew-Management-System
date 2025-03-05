import mongoose, { mongo } from "mongoose";

const customerSchema = new mongoose.Schema({
  countTransactions: async function () {
    const transactionCount = await mongoose
      .model("transactions")
      .countDocuments({
        customer_name: this.customer_name,
        customer_address: this.customer_address,
      });
    this.transaction_count = transactionCount;
  },
  customer_id: {
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
  transaction_count: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("customers", customerSchema);
customerSchema.pre("save", async function (next) {
  await this.countTransactions();
  next();
});
