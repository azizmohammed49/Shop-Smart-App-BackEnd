import mongoose from "mongoose";
import { USERTYPE } from "../utils/constants.js";
import { generateHash } from "../utils/crypt.js";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    userType: {
      type: String,
      default: USERTYPE.USER,
      enum: Object.values(USERTYPE),
    },
    permissions: {
      type: Array,
      required: function () {
        return this.userType !== USERTYPE.ADMIN;
      },
    },
    isActive: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    verificationToken: String,
    resetPasswordToken: String,
    failedLoginAttempts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// userSchema.index({ email: 1 }, { unique: true });

userSchema.pre("save", async function (next) {
  this.password = await generateHash(this.password, 10);
  next();
});

export default mongoose.model("users", userSchema);
