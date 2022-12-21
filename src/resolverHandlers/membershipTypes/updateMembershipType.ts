import {
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { MembershipTypeModel } from "../../models/MembershipTypes";
import { MembershipType, MyContext, TextResponse } from "../../types";

export const updateMembershipTypeHandler = async (
  _parents: never,
  args: MembershipType,
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    await MembershipTypeModel.findByIdAndUpdate(args.id, args);
    return { data: "Updated Membership Type Successfully" };
  }
};
