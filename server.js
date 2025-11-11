import cors from "cors";
import express from "express";
import router from "./routes/routes.js"; // Main router import
import connectDB from "./config/db.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
