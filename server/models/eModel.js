import mongoose, { mongo } from "mongoose";
import SequenceFactory from "mongoose-sequence";
const AutoIncrement = SequenceFactory(mongoose);

const expenseSchema = new mongoose.Schema({
  expense_id: {
    type: Number,
    unique: true,
  },
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
    default: () => {
      const date = new Date();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const yyyy = date.getFullYear();
      return `${mm}/${dd}/${yyyy}`;
    },
  },
});

expenseSchema.plugin(AutoIncrement, { inc_field: "expense_id" });

export default mongoose.model("expenses", expenseSchema);
