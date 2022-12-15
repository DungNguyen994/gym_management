import mongoose, { Schema } from "mongoose";

const inventorySchema = new Schema({
  productId: String,
  productType: String,
  productName: String,
  supplier: String,
  quantity: Number,
  unitPrice: Number,
  discountPercent: Number,
  photo: String,
});
export const InventoryModel = mongoose.model("inventory", inventorySchema);
