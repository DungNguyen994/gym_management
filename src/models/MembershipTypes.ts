import mongoose, { Schema } from "mongoose";

const membershipTypeSchema = new Schema({
  name: String,
  pricePerMonth: Number,
  discountPercent: Number,
});
export const MembershipTypeModel = mongoose.model(
  "membership-type",
  membershipTypeSchema
);
