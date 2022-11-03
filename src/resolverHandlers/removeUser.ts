import { NoPermissionError, UnauthorizedError } from "../constant";
import { User_Role } from "../constant";
import { UserModel } from "../models/UserModel";
import { TextResponse } from "../types";
import { MyContext } from "../types";

export const removeUserHandler = async (
  _parents: never,
  args: { username: string },
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  if (user.role !== User_Role.admin) return { errors: NoPermissionError };
  const { username } = args;
  await UserModel.findOneAndDelete({ username });
  return { data: "Deleted user Successfully" };
};
