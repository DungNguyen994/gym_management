import { MemberModel } from "../../models/MemberModel";
import { NoPermissionError } from "../../constant";
import { User_Role } from "../../constant";
import { UnauthorizedError } from "../../constant";
import { MyContext, Member, TextResponse } from "../../types";

export const updateMemberHandler = async (
  _parents: never,
  args: Member,
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    await MemberModel.findByIdAndUpdate(args._id, args);
    return { data: "Updated Member Successfully" };
  }
};
