import { createUser, getUserByEmail } from "../repositories/user.repo.js";
import { compareHash, generateToken } from "../utils/crypt.js";
import { log } from "../utils/logger.js";

export const registerUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await createUser(data);
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: {
        _id: user._id,
        name: user?.name,
        email: user?.email,
        userType: user?.userType,
        isActive: user?.isActive,
        permissions: user?.permissions,
        isEmailVerified: user?.isEmailVerified,
      },
    });
  } catch (error) {
    log(
      undefined,
      req.url,
      error?.code === 11000 ? 400 : 500,
      error?.code === 11000
        ? "Email Already Exists!"
        : "Internal Server Error!",
      error
    );
    res
      .status(error?.code === 11000 ? 400 : 500)
      .json({
        success: false,
        message:
          error?.code === 11000
            ? "Email Already Exists!"
            : "Internal Server Error!",
      });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (user) {
      let isPassValid = await compareHash(password, user?.password);
      if (isPassValid) {
        const token = generateToken({ userId: user?._id });
        return res.status(200).json({
          success: true,
          message: "Login successful!",
          data: {
            token,
            _id: user._id,
            name: user?.name,
            email: user?.email,
            userType: user?.userType,
            isActive: user?.isActive,
            permissions: user?.permissions,
            isEmailVerified: user?.isEmailVerified,
          },
        });
      }
    }
    log(undefined, req.url, 400, "Invalid Email/Password");
    res
      .status(400)
      .json({ success: false, message: "Invalid Email/Password!" });
  } catch (error) {
    log(undefined, req.url, 400, "Invalid Email/Password", error);
    res
      .status(400)
      .json({ success: false, message: "Invalid Email/Password!" });
  }
};
