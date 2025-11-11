import express from "express";
import {
  addSupplier,
  allSuppliers,
} from "../controllers/supplier.controller.js";
import { isLoggedIn } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", isLoggedIn, allSuppliers);
router.post("/addSupplier", isLoggedIn, addSupplier);

export default router;
