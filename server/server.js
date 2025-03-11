//IMPORTS
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/database.js";
import authRoutes from "./routes/aRoutes.js";
import cors from "cors";
import axios from "axios";

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
app.use(
  cors({
    origin: [
      "https://crystal-dew-management-system-frontend.onrender.com",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors);
app.use(express.json());
app.use(morgan("dev"));

// ROUTES
app.use("/api/va/auth", authRoutes);

// PORT
const PORT = process.env.PORT || 8080;

// Keeps Server Online
const url = `https://crystal-dew-management-system.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log(
        `Reloaded at ${new Date().toISOString()}: Status Code ${
          response.status
        }`
      );
    })
    .catch((error) => {
      console.error(
        `Error reloading at ${new Date().toISOString()}:`,
        error.message
      );
    });
}

// RUN LISTEN
app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgWhite
      .black
  );
  setInterval(reloadWebsite, interval);
});
