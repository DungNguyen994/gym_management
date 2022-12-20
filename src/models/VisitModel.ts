import mongoose, { Schema } from "mongoose";

const visitSchema = new Schema({
  memberId: String,
  date: String,
});
export const VisitModel = mongoose.model("visit", visitSchema);
