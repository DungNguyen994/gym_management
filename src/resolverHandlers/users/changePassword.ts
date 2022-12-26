import { hash } from "argon2";
import {
  Error_Code,
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { UserModel } from "../../models/UserModel";
import { MyContext, TextResponse } from "../../types";
import { verify } from "argon2";

export const changePasswordHandler = async (
  _parents: never,
  args: { id: string; password: string; currentPassword: string },
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const user = await UserModel.findById(args.id).exec();
    if (user?.password) {
      const isValid = await verify(user.password, args.currentPassword);
      if (!isValid)
        return {
          errors: {
            type: Error_Code.invalid,
            pointer: "password",
            message: "Your current password is incorrect",
          },
        };
      else {
        const hashedPassword = await hash(args.password);
        await UserModel.findByIdAndUpdate(args.id, {
          password: hashedPassword,
        });
        return { data: "Updated Pasword Successfully" };
      }
    } else {
      return {
        errors: {
          type: Error_Code.invalid,
          pointer: "password",
          message: "Your current password is incorrect",
        },
      };
    }
  }
};
