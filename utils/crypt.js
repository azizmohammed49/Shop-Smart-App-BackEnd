import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const generateHash = async (plainTxt, saltRounds) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(plainTxt, salt);
};

export const compareHash = (plainTxt, hashTxt) => {
  return bcrypt.compare(plainTxt, hashTxt);
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
