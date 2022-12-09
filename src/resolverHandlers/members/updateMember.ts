import { MemberModel } from "../../models/MemberModel";
import { DATE_FORMAT, NoPermissionError } from "../../constant";
import { User_Role } from "../../constant";
import { UnauthorizedError } from "../../constant";
import { MyContext, Member, TextResponse } from "../../types";
import dayjs from "dayjs";
import { PaymentModel } from "../../models/PaymentModel";

export const updateMemberHandler = async (
  _parents: never,
  args: Member,
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    await MemberModel.findByIdAndUpdate(args.id, args);
    const payment = {
      ...args.payment,
      createdAt: dayjs().format(DATE_FORMAT),
      memberId: args.id,
    };
    const newPayment = new PaymentModel(payment);
    await newPayment.save();
    return { data: "Updated Member Successfully" };
  }
};
