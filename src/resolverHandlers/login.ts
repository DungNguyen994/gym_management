import { verify } from "argon2";
import { sign } from "jsonwebtoken";
import { Error_Code, ONE_DAY_TIME_IN_MS } from "../constant";
import { UserModel } from "../models/UserModel";
import { MyContext, TextResponse, UserNameAndPasswordInput } from "../types";

export const loginHandler = async (
  _parents: never,
  args: UserNameAndPasswordInput,
  { res }: MyContext
): Promise<TextResponse> => {
  const { username, password } = args;
  const user = await UserModel.findOne({ username }).exec();
  if (!user) {
    return {
      errors: {
        type: Error_Code.not_found,
        pointer: "username",
        message: "Username not found",
      },
    };
  } else if (user.password !== undefined) {
    const isValid = await verify(user.password, password);
    if (!isValid)
      return {
        errors: {
          type: Error_Code.invalid,
          pointer: "password",
          message: "Your password is incorrect",
        },
      };
  }
  const userInfo = {
    username,
    role: user.role,
    fullName: `${user.firstName} ${user.lastName}`,
  };
  const accessToken = sign(
    { user: userInfo },
    process.env.ACCESS_TOKEN_SECRET || "",
    { expiresIn: "1h" }
  );
  const refreshToken = sign(
    { user: userInfo },
    process.env.REFRESH_TOKEN_SECRET || "",
    { expiresIn: "1d" }
  );
  await user.updateOne({ refreshToken });
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: ONE_DAY_TIME_IN_MS,
  });
  return { data: accessToken };
};
