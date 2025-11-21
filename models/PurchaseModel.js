import mongoose from "mongoose";
import { productSchema } from "./ProductModel.js";

const Schema = mongoose.Schema;

const prdSchema = new Schema({
  productId: { type: mongoose.SchemaTypes.ObjectId, ref: "products" },
  qty: Number,
  purchasePrice: Number,
});

const purchaseSchema = new Schema(
  {
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "supplier",
      required: true,
    }, // Changed from supplier
    products: [prdSchema],
    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
export default mongoose.model("purchase", purchaseSchema);
