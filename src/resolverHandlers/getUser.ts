import { NoPermissionError } from "../constant";
import { User_Role } from "../constant";
import { Error_Code } from "../constant";
import { UnauthorizedError } from "../constant";
import { UserModel } from "../models/UserModel";
import { UserResponse } from "../types";
import { MyContext } from "../types";

export const getUser = async (
  _parents: never,
  args: { username: string },
  { user }: MyContext
): Promise<UserResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { username } = args;
  const { role } = user;
  if (role !== User_Role.admin) return { errors: NoPermissionError };
  else {
    const _user = await UserModel.find({ username }).exec();
    if (_user) return { data: user };
    else
      return {
        errors: {
          type: Error_Code.not_found,
          pointer: "username",
          message: "username not found",
        },
      };
  }
};
