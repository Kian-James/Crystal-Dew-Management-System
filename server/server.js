import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/database.js";
import authRoutes from "./routes/aRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// CONFIG ENV
dotenv.config();

// OBJECTS
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DATABASE CONFIGS
connectDB();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve static files from Vite build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "dist")));

  // Handle SPA routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

// API ROUTES
app.use("/api/va/auth", authRoutes);

// PORT
const PORT = process.env.PORT || 8080;

// RUN LISTEN
app.listen(PORT, () => {
  console.log(
    `Server is running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`.bgWhite.black
  );
});
