import mongoose, { Schema } from "mongoose";

const memberSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  address: String,
  photo: String,
  email: String,
  notes: Schema.Types.Mixed,
  gender: String,
  startDate: String,
  endDate: String,
  birthDate: String,
  payments: Schema.Types.Mixed,
});
export const MemberModel = mongoose.model("member", memberSchema);
