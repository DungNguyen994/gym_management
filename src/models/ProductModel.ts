import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  productType: String,
  productName: String,
  supplier: String,
  unitPrice: Number,
  discountPercent: Number,
  photo: String,
});
export const ProductModel = mongoose.model("product", productSchema);
