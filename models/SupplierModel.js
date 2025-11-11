import mongoose from "mongoose";

const Schema = mongoose.Schema;

const supplierSchema = new Schema(
  {
    supplierName: { type: String, required: true, trim: true },
    contactName: { type: String, required: true, trim: true },
    contactPhone: { type: Number, required: true },
    contactPhoneCode: { type: String, required: true },
    email: String,
    address: String,
  },
  { timestamps: true }
);

export default mongoose.model("supplier", supplierSchema);
