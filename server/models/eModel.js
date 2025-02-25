import mongoose, { mongo } from "mongoose";

const expenseSchema = new mongoose.Schema({
  expense_name: {
    type: String,
    required: true,
    trim: true,
  },
  expense_cost: {
    type: Number,
    required: true,
  },
  expense_date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
});

export default mongoose.model("expenses", expenseSchema);
