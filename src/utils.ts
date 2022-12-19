import { MEMBERSHIP_STATUS } from "./constant";
import { MemberModel } from "./models/MemberModel";
import { Membership } from "./types";

export const updateRemainingDays = async () => {
  const activeMembers = await MemberModel.find({ "memberships.status": "A" });
  console.log(activeMembers);
};

export const getMembershipStatus = (memberships: Membership[]) => {
  const isActive = memberships.some(
    (membership) => membership.status === MEMBERSHIP_STATUS.ACTIVE
  );
  const isExpired = memberships.every(
    (membership) => membership.status === MEMBERSHIP_STATUS.EXPIRED
  );
  return isActive
    ? MEMBERSHIP_STATUS.ACTIVE
    : isExpired
    ? MEMBERSHIP_STATUS.EXPIRED
    : MEMBERSHIP_STATUS.HOLD;
};

export const getRemainingDays = (memberships: Membership[]) =>
  memberships.reduce((total, membership) => {
    return total + Number(membership.remainingDays);
  }, 0);
