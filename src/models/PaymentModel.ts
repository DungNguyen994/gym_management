import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  productName: String,
  membershipType: String,
  term: String,
  paymentMethod: String,
  collected: Number,
  change: Number,
  total: Number,
  quantity: Number,
  createdAt: String,
  memberId: String,
});
export const PaymentModel = mongoose.model("payment", paymentSchema);
