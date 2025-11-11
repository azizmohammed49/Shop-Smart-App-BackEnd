import UserModel from "../models/UserModel.js";

export const createUser = async (data) => {
  const user = await UserModel.create(data);
  return user;
};

export const getUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email });
  return user;
};
