import mongoose, { Schema } from "mongoose";

const memberSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  address: String,
  photo: String,
  email: String,
  note: String,
  gender: String,
  amount: String,
  term: String,
  membershipType: String,
  startDate: String,
  endDate: String,
  birthDate: String,
  paymentType: String,
});
export const MemberModel = mongoose.model("member", memberSchema);
