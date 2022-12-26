import {
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { UserModel } from "../../models/UserModel";
import { MyContext, TextResponse, User } from "../../types";

export const updateUserHandler = async (
  _parents: never,
  args: User,
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    await UserModel.findByIdAndUpdate(args.id, args);
    return { data: "Updated User Successfully" };
  }
};
