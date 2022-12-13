import {
  DATE_FORMAT,
  Error_Code,
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { MemberModel } from "../../models/MemberModel";
import { Member, MyContext, TextResponse } from "../../types";
import produce from "immer";
import dayjs from "dayjs";

export const activateMembershipHandler = async (
  _parents: never,
  args: { memberId: string; startDate: string },
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const member = await MemberModel.findById(args.memberId);
    if (member) {
      const { memberships } = member.toObject() as Member;

      const newMembeships = produce(memberships, (draftState) => {
        const foundMembershipIndex = draftState.findIndex((membership) =>
          dayjs(membership.startDate).isSame(dayjs(args.startDate), "day")
        );
        draftState.forEach((membership) => {
          membership.status = "H";
        });
        if (foundMembershipIndex >= 0) {
          draftState[foundMembershipIndex].status = "A";
          if (draftState[foundMembershipIndex].holdDate) {
            const holdingDays = dayjs().diff(
              dayjs(draftState[foundMembershipIndex].holdDate),
              "day"
            );
            draftState[foundMembershipIndex].endDate = dayjs(
              draftState[foundMembershipIndex].endDate
            )
              .add(holdingDays, "day")
              .format(DATE_FORMAT);
          }
        }
      });
      await MemberModel.findByIdAndUpdate(args.memberId, {
        memberships: newMembeships,
      });
      return { data: "Activate membership Successfully" };
    } else
      return {
        errors: { message: "Member not found!", type: Error_Code.not_found },
      };
  }
};
