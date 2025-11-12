import mongoose from "mongoose";
import { productSchema } from "./ProductModel.js";

const Schema = mongoose.Schema;

const purchaseSchema = new Schema(
  {
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "supplier",
      required: true,
    },
    products: [productSchema],
    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
export default mongoose.model("purchase", purchaseSchema);
