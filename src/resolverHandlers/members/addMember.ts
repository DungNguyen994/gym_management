import dayjs from "dayjs";
import { PaymentModel } from "../../models/PaymentModel";
import {
  DATE_FORMAT,
  MEMBERSHIP_STATUS,
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { MemberModel } from "../../models/MemberModel";
import { AddMemberInput, MyContext, TextResponse } from "../../types";
import RelativeTime from "dayjs/plugin/relativeTime";
import { MembershipModel } from "../../models/MembershipModel";

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
