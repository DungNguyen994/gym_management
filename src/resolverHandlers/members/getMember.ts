import { MembershipModel } from "../../models/MembershipModel";
import {
  MEMBERSHIP_STATUS,
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { MemberModel } from "../../models/MemberModel";
import { Member, MemberResponse, Membership, MyContext } from "../../types";
import { getMembershipStatus } from "../../utils";
import { getRemainingDays } from "../../utils";

export const getMemberHandler = async (
  _parents: never,
  args: { id: string },
  { user }: MyContext
): Promise<MemberResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const member = await MemberModel.findById(args.id).exec();
    const memberships = await MembershipModel.find({
      memberId: args.id,
    }).exec();

    const currentMembership = memberships.find(
      (membership) => membership.status === MEMBERSHIP_STATUS.ACTIVE
    );
    const _memberships = memberships.map((m) => ({
      ...(m.toObject() as Membership),
      id: m._id.toString(),
    }));
    const _member = {
      ...member?.toObject(),
      id: member?.id,
      status: getMembershipStatus(_memberships),
      remainingDays: getRemainingDays(_memberships),
      currentMembershipType: currentMembership?.membershipType || "",
      memberships: [..._memberships],
    } as Member;
    return {
      data: _member as Member,
    };
  }
};
