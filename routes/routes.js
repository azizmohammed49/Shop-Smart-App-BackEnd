import express from "express";
import userRouter from "./user.route.js";
import productRouter from "./product.route.js";
import supplierRouter from "./supplier.route.js";

const router = express.Router();

// User routes
router.use("/users", userRouter); // Remove trailing slash
router.use("/products", productRouter); // Remove trailing slash
router.use("/supplier", supplierRouter); // Example for another entity

// Middleware to log the path
router.use((req, res, next) => {
  console.log("[Main Router] Path:", req.path);
  next();
});

export default router;
