import express from "express";
import {
  addPurchase,
  allPurchases,
} from "../controllers/purchase.controller.js";
import { isLoggedIn } from "../middleware/auth.js";
const router = express.Router();

router.get("/", isLoggedIn, allPurchases);
router.post("/addPurchase", isLoggedIn, addPurchase);

export default router;
