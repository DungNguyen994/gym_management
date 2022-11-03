import { User_Role } from "../constant";
import { NoPermissionError } from "../constant";
import { UnauthorizedError } from "../constant";
import { UserModel } from "../models/UserModel";
import { ListUserResponse, User } from "../types";
import { MyContext } from "../types";

export const getUsers = async (
  _parents: never,
  _args: any,
  { user }: MyContext
): Promise<ListUserResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role !== User_Role.admin) return { errors: NoPermissionError };
  else {
    const users = (await UserModel.find()) as User[];
    return { data: users };
  }
};
