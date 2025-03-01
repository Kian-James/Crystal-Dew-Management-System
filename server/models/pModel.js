import mongoose, { mongo } from "mongoose";
import SequenceFactory from "mongoose-sequence";
const AutoIncrement = SequenceFactory(mongoose);

const productSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    unique: true,
  },
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

productSchema.plugin(AutoIncrement, { inc_field: "product_id" });

export default mongoose.model("products", productSchema);
