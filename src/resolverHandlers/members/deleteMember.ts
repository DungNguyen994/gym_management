import { MembershipModel } from "../../models/MembershipModel";
import {
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { MemberModel } from "../../models/MemberModel";
import { MyContext, TextResponse } from "../../types";

export const deleteMemberHandler = async (
  _parents: never,
  args: { id: string },
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    await MemberModel.findByIdAndDelete(args.id);
    await MembershipModel.deleteMany({ memberId: args.id });
    return { data: "Delete Member Successfully" };
  }
};
