import { MEMBERSHIP_STATUS } from "./constant";
import { MembershipModel } from "./models/MembershipModel";
import { Membership } from "./types";

export const updateRemainingDays = async () => {
  const activateMemberships = await MembershipModel.find({
    status: MEMBERSHIP_STATUS.ACTIVE,
  }).exec();
  activateMemberships.forEach((membership) => {
    if (membership.remainingDays && membership.remainingDays > 0) {
      membership.remainingDays = Number(membership.remainingDays) - 1;
    } else {
      membership.status = MEMBERSHIP_STATUS.EXPIRED;
    }
    membership.save();
  });
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
