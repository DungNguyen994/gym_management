import { PaymentModel } from "../../models/PaymentModel";
import {
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { MemberModel } from "../../models/MemberModel";
import { ListPaymentResponse, Member, MyContext, Payment } from "../../types";

export const getPaymentsHandler = async (
  _parents: never,
  _args: never,
  { user }: MyContext
): Promise<ListPaymentResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const payments = (await PaymentModel.find().exec()) as Payment[];
    const members = (await MemberModel.find().exec()) as Member[];
    payments.forEach((payment) => {
      const foundMember = members.find(
        (member) => member.id === payment.memberId
      );
      if (foundMember)
        payment.memberName =
          foundMember?.firstName && foundMember?.lastName
            ? foundMember?.firstName + " " + foundMember?.lastName
            : "";
    });
    return { data: payments };
  }
};
