import { UserModel } from "../models/UserModel";
import { ONE_DAY_TIME_IN_MS } from "../constant";
import { MyContext, TextResponse } from "../types";

export const logoutHandler = async (
  _parents: never,
  _args: never,
  { req, res }: MyContext
): Promise<TextResponse> => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return {
      data: "Logout successfully",
    };
  const refreshToken = cookies.jwt;

  const foundUser = await UserModel.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: ONE_DAY_TIME_IN_MS });
    return {
      data: "Logout successfully",
    };
  }
  await foundUser.updateOne({ refreshToken: "" });
  res.clearCookie("jwt", { httpOnly: true, maxAge: ONE_DAY_TIME_IN_MS });
  return {
    data: "Logout successfully",
  };
};
