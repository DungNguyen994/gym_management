import {
  MEMBERSHIP_STATUS,
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { MembershipModel } from "../../models/MembershipModel";
import { MyContext, TextResponse } from "../../types";

export const activateMembershipHandler = async (
  _parents: never,
  args: { id: string; memberId: string },
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    await MembershipModel.updateMany(
      { memberId: args.memberId },
      { status: MEMBERSHIP_STATUS.HOLD }
    );
    await MembershipModel.findByIdAndUpdate(args.id, {
      status: MEMBERSHIP_STATUS.ACTIVE,
    });
    return { data: "Activate membership Successfully" };
  }
};
