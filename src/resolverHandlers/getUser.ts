import { Error_Code, NoPermissionError, User_Role } from "../constant";
import { UserModel } from "../models/UserModel";
import { User, UserResponse } from "../types";

export const getUser = async (
  _parents: never,
  args: { username: string },
  { user }: any
): Promise<UserResponse> => {
  const { role } = user.user;
  if (role !== User_Role.admin) return { errors: NoPermissionError };
  else {
    const _user = (await UserModel.findOne({
      username: args.username,
    }).exec()) as User;
    if (_user) return { data: _user };
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
