import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
  password: String,
  role: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  refreshToken: String,
  photo: Buffer,
});
export const UserModel = mongoose.model("user", userSchema);
