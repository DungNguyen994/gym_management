import {
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { MembershipTypeModel } from "../../models/MembershipTypes";
import { AddMembershipTypeInput, MyContext, TextResponse } from "../../types";

export const addMembershipTypeHandler = async (
  _parents: never,
  args: AddMembershipTypeInput,
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const membershipType = new MembershipTypeModel(args);
    await membershipType.save();
    return { data: "Added Membership Type Successfully" };
  }
};
