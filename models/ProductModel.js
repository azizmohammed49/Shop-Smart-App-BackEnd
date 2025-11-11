import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    supplier: { type: Schema.Types.ObjectId, ref: "supplier", required: true },
    purchasePrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    stockQty: { type: Number, default: 0 },
    imageURL: String,
  },
  { timestamps: true }
);

export default mongoose.model("product", productSchema);
