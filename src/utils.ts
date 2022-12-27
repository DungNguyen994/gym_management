import dayjs from "dayjs";
import { MEMBERSHIP_STATUS } from "./constant";
import { MembershipModel } from "./models/MembershipModel";
import { Membership } from "./types";

export const updateRemainingDays = async () => {
  const activeMemberships = await MembershipModel.find({
    status: MEMBERSHIP_STATUS.ACTIVE,
  }).exec();
  activeMemberships.forEach((membership) => {
    if (membership.remainingDays && membership.remainingDays > 0) {
      membership.remainingDays = Number(membership.remainingDays) - 1;
    } else {
      membership.status = MEMBERSHIP_STATUS.EXPIRED;
    }
    membership.save();
  });
  console.log("Updated remaining days for memberships successfully");
};

export const activateOnHoldMembership = async () => {
  const onHoldMemberships = await MembershipModel.find({
    status: MEMBERSHIP_STATUS.HOLD,
  }).exec();
  onHoldMemberships.forEach((membership) => {
    if (
      !membership.holdDate &&
      dayjs(membership.startDate).isSame(dayjs(), "day")
    ) {
      membership.status = MEMBERSHIP_STATUS.ACTIVE;
    }
    membership.save();
  });
  console.log("Activate on hold memberships successfully");
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
