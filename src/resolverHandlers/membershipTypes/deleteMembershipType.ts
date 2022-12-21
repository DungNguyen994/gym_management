import {
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { MembershipTypeModel } from "../../models/MembershipTypes";
import { MyContext, TextResponse } from "../../types";

export const deleteMembershipTypeHandler = async (
  _parents: never,
  args: { id: string },
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    await MembershipTypeModel.findByIdAndDelete(args.id);
    return { data: "Deleted Membership Type Successfully" };
  }
};
