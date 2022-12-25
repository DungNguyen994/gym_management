import { UserModel } from "../models/UserModel";
import { Error_Code } from "../constant";
import { MyContext, TextResponse } from "../types";
import { sign, verify } from "jsonwebtoken";

export const refreshTokenHandler = async (
  _parents: never,
  _args: never,
  { req }: MyContext
): Promise<TextResponse> => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return {
      errors: {
        type: Error_Code.unauthorized,
        message: "You do not have permission!.",
      },
    };
  const refreshToken = cookies.jwt;

  const foundUser = await UserModel.findOne({ refreshToken }).exec();
  if (!foundUser)
    return {
      errors: {
        type: Error_Code.forbidden,
        message: "Please Login and try again!",
      },
    };
  const { username, role, firstName, lastName } = foundUser;
  const userInfo = {
    username,
    role,
    firstName: firstName,
    lastName: lastName,
  };
  let accessToken;
  verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET || "",
    (err: any, decoded: any): void => {
      if (err || username !== decoded.user?.username) return;
      accessToken = sign(
        { user: userInfo },
        process.env.ACCESS_TOKEN_SECRET || "",
        { expiresIn: "10m" }
      );
    }
  );
  if (!accessToken)
    return {
      errors: {
        type: Error_Code.forbidden,
        message: "Please Login and try again!",
      },
    };
  return { data: accessToken };
};
