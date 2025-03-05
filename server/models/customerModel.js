import mongoose, { mongo } from "mongoose";
import SequenceFactory from "mongoose-sequence";
const AutoIncrement = SequenceFactory(mongoose);

const customerSchema = new mongoose.Schema({
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
  transaction_count: {
    type: Number,
  },
});

customerSchema.plugin(AutoIncrement, { inc_field: "customer_id" });

export default mongoose.model("customer", customerSchema);
