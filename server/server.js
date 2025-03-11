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

// DATABASE CONFIG
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
app.use(express.json());
app.use(morgan("dev"));

// ROUTES
app.use("/api/va/auth", authRoutes);

// 🔹 Serve frontend static files
const __dirname = path.resolve();
const frontendPath = path.join(__dirname, "client", "dist"); // Change to "build" for Create React App

console.log("Serving frontend from:", frontendPath);
app.use(express.static(frontendPath));

// 🔹 Redirect all unknown routes to React index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

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
