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
  birthDate: String,
});
export const MemberModel = mongoose.model("member", memberSchema);
