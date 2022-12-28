import dayjs from "dayjs";
import {
  DATE_FORMAT,
  Error_Code,
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { MemberModel } from "../../models/MemberModel";
import { MembershipModel } from "../../models/MembershipModel";
import { Member, MyContext, TextResponse } from "../../types";
import { PaymentModel } from "../../models/PaymentModel";
import { MembershipTypeModel } from "../../models/MembershipTypes";

export const updateMemberHandler = async (
  _parents: never,
  args: Member,
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const membershipTypes = await MembershipTypeModel.find().exec();
    const membershipTypeNames = membershipTypes.map((t) => t.name);
    if (
      args.newMembership &&
      !membershipTypeNames.includes(args.newMembership.membershipType)
    ) {
      return {
        errors: {
          type: Error_Code.invalid,
          message: "Choose a valid membership Type",
          pointer: "membership.membershipType",
        },
      };
    }
    await MemberModel.findByIdAndUpdate(args.id, args);
    const { newMembership, payment } = args;
    if (newMembership) {
      const { startDate, endDate } = newMembership;
      const _newMembership = new MembershipModel({
        ...newMembership,
        remainingDays: dayjs(endDate).diff(dayjs(startDate), "day"),
        memberId: args.id,
      });
      await _newMembership.save();
    }
    if (payment) {
      const newPayment = new PaymentModel({
        ...args.payment,
        createdAt: dayjs().format(DATE_FORMAT),
        memberId: args.id,
      });
      await newPayment.save();
    }
    return { data: "Updated Member Successfully" };
  }
};
