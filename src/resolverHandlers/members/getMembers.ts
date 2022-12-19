import { MembershipModel } from "../../models/MembershipModel";
import {
  MEMBERSHIP_STATUS,
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { MemberModel } from "../../models/MemberModel";
import { ListMemberResponse, Member, Membership, MyContext } from "../../types";
import produce from "immer";
import { getMembershipStatus, getRemainingDays } from "../../utils";

export const getMembersHandler = async (
  _parents: never,
  _args: never,
  { user }: MyContext
): Promise<ListMemberResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const members = (await MemberModel.find()) as Member[];
    const memberships = (await MembershipModel.find()) as Membership[];
    const _members = produce(members, (draft) => {
      draft.forEach((member) => {
        const memberMemberships = memberships.filter(
          (membership) => membership.memberId === member.id
        );
        const currentMembership = memberMemberships.find(
          (membership) => membership.status === MEMBERSHIP_STATUS.ACTIVE
        );
        member.currentMembershipType = currentMembership?.membershipType || "";
        member.status = getMembershipStatus(memberMemberships);
        member.remainingDays = getRemainingDays(memberMemberships);
      });
      return draft;
    });
    return { data: _members };
  }
};
