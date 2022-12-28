import dayjs from "dayjs";
import { PaymentModel } from "../../models/PaymentModel";
import {
  DATE_FORMAT,
  Error_Code,
  MEMBERSHIP_STATUS,
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { MemberModel } from "../../models/MemberModel";
import { AddMemberInput, MyContext, TextResponse } from "../../types";
import RelativeTime from "dayjs/plugin/relativeTime";
import { MembershipModel } from "../../models/MembershipModel";
import { MembershipTypeModel } from "../../models/MembershipTypes";

export const addMemberHandler = async (
  _parents: never,
  args: AddMemberInput,
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    dayjs.extend(RelativeTime);
    const membershipTypes = await MembershipTypeModel.find().exec();
    const membershipTypeNames = membershipTypes.map((t) => t.name);
    if (!membershipTypeNames.includes(args.membership.membershipType)) {
      return {
        errors: {
          type: Error_Code.invalid,
          message: "Choose a valid membership Type",
          pointer: "membership.membershipType",
        },
      };
    }
    const member = new MemberModel({
      ...args,
      createdAt: dayjs().format(DATE_FORMAT),
    });
    const newMember = await member.save();
    const payment = {
      ...args.payment,
      createdAt: dayjs().format(DATE_FORMAT),
      memberId: newMember._id,
    };
    const newPayment = new PaymentModel(payment);
    await newPayment.save();
    const _membership = {
      ...args.membership,
      status: dayjs(args.membership.startDate).isAfter(dayjs())
        ? MEMBERSHIP_STATUS.HOLD
        : MEMBERSHIP_STATUS.ACTIVE,
      remainingDays: dayjs(args.membership.endDate).diff(
        dayjs(args.membership.startDate),
        "day"
      ),
      memberId: newMember._id,
    };
    const membership = new MembershipModel(_membership);
    await membership.save();
    return { data: "Added Member Successfully" };
  }
};
