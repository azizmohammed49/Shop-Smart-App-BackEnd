import { verifyToken } from "../utils/crypt.js";

export const isLoggedIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized Token Expired" });
  }
};
