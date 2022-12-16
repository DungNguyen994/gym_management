import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  membershipType: String,
  term: String,
  paymentMethod: String,
  collected: Number,
  change: Number,
  total: Number,
  createdAt: String,
  memberId: String,
  products: Schema.Types.Mixed,
});
export const PaymentModel = mongoose.model("payment", paymentSchema);
