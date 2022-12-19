import mongoose, { Schema } from "mongoose";

const membershipSchema = new Schema({
  membershipType: String,
  term: String,
  startDate: String,
  endDate: String,
  status: String,
  holdDate: String,
  remainingDays: Number,
  memberId: String,
});
export const MembershipModel = mongoose.model("membership", membershipSchema);
