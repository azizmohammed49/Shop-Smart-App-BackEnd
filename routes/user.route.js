import express from "express";
import { login, registerUser } from "../controllers/userController.js";
import { validateRequest } from "../middleware/requestValidator.js";
import { registerUserSchema } from "../utils/zodSchema.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log("[User Router] Path:", req.path);
  next();
});

router.post("/register", registerUser);
router.post("/login", login);

export default router;
