import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(import.meta.env.MONGO_URL);
    console.log(
      `Connected to MongoDB database ${conn.connection.host}`.bgCyan.white
    );
  } catch (error) {
    console.log(`Error in MongoDB ${error}`);
  }
};

export default connectDB;
