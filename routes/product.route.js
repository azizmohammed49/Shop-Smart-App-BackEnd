import express from "express";
import { addProduct, allProducts } from "../controllers/product.controller.js";
import { isLoggedIn } from "../middleware/auth.js";

const router = express.Router();

router.get("/allProducts", isLoggedIn, allProducts);
router.post("/addProduct", isLoggedIn, addProduct);

export default router;
