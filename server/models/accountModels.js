import mongoose, { mongo } from "mongoose";
import SequenceFactory from "mongoose-sequence";
const AutoIncrement = SequenceFactory(mongoose);

const accountSchema = new mongoose.Schema(
  {
    account_id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.plugin(AutoIncrement, { inc_field: "account_id" });

export default mongoose.model("accounts", accountSchema);
