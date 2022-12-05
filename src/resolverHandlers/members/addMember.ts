import dayjs from "dayjs";
import { PaymentModel } from "../../models/PaymentModel";
import {
  DATE_FORMAT,
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { MemberModel } from "../../models/MemberModel";
import { AddMemberInput, MyContext, TextResponse } from "../../types";

export const addMemberHandler = async (
  _parents: never,
  args: AddMemberInput,
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const memberships = [args.membership];
    const member = new MemberModel({ ...args, memberships });
    const newMember = await member.save();
    const payment = {
      ...args.payment,
      createdAt: dayjs().format(DATE_FORMAT),
      memberId: newMember._id,
    };
    const newPayment = new PaymentModel(payment);
    await newPayment.save();
    return { data: "Added Member Successfully" };
  }
};
