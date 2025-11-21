import cors from "cors";
import express from "express";
import router from "./routes/routes.js"; // Main router import
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Debug middleware
app.use((req, res, next) => {
  console.log(`[Server] ${req.method} ${req.url}`);
  console.log("[Server] Request Body:", req.body);
  next();
});

// Mount main router
app.use("/v1/api", router); // This will handle all /v1/api routes

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server only after connecting to database
connectDB(app);
//update
