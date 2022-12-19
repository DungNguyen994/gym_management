import {
  MEMBERSHIP_STATUS,
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { MembershipModel } from "../../models/MembershipModel";
import { MyContext, TextResponse } from "../../types";

export const holdMembershipHandler = async (
  _parents: never,
  args: { id: string },
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    await MembershipModel.findByIdAndUpdate(args.id, {
      status: MEMBERSHIP_STATUS.HOLD,
    });
    return { data: "Hold Membership Successfully" };
  }
};
