//IMPORTS
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/database.js";
import authRoutes from "./routes/aRoutes.js";
import cors from "cors";

// CONFIG ENV
dotenv.config();

// OBJECTS
const app = express();

// API
app.get("/", (req, res) => {
  res.send("<h1>Welcome to our Web Application using MERN STACK</h1>");
});

// DATABASE CONFIGS
connectDB();

// MIDDLEWARES
app.use(cors());
app.options("*", cors);
app.use(express.json());
app.use(morgan("dev"));

// ROUTES
app.use("/api/va/auth", authRoutes);

// PORT
const PORT = process.env.PORT || 8080;

// RUN LISTEN
app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgWhite
      .black
  );
});
