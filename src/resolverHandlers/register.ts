import { hash } from "argon2";
import { Response } from "express";
import { sign } from "jsonwebtoken";
import { Error_Code, ONE_DAY_TIME_IN_MS } from "../constant";
import { User_Role } from "../constant";
import { UserModel } from "../models/UserModel";
import { RegisterInput, TextResponse } from "../types";

export const registerHandler = async (
  _parents: never,
  args: RegisterInput,
  { res }: { res: Response }
): Promise<TextResponse> => {
  const { username, password, firstName, lastName, phoneNumber, email } = args;
  const hashedPassword = await hash(password);
  const role = User_Role.member;
  const foundUserByUsername = await UserModel.findOne({ username }).exec();
  if (foundUserByUsername)
    return {
      errors: {
        type: Error_Code.invalid,
        message:
          "The username is already exist!. Please choose a different username.",
        pointer: "username",
      },
    };
  const foundUserByPhoneNumber = await UserModel.findOne({
    phoneNumber,
  }).exec();
  if (foundUserByPhoneNumber)
    return {
      errors: {
        type: Error_Code.invalid,
        message:
          "The Phone Number is already exist!. Please choose a different number or log in instead.",
        pointer: "phoneNumber",
      },
    };
  const fullName = firstName + " " + lastName;
  const userInfo = { fullName, role, username };
  const accessToken = sign(
    { user: userInfo },
    process.env.ACCESS_TOKEN_SECRET || "",
    { expiresIn: "10m" }
  );
  const refreshToken = sign(
    { user: userInfo },
    process.env.REFRESH_TOKEN_SECRET || "",
    { expiresIn: "1d" }
  );
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: ONE_DAY_TIME_IN_MS,
  });
  const newUser = new UserModel({
    username,
    password: hashedPassword,
    role,
    firstName,
    lastName,
    phoneNumber,
    email,
    refreshToken,
  });
  await newUser.save();
  return { data: accessToken };
};
