import dayjs from "dayjs";
import {
  DATE_FORMAT,
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { PaymentModel } from "../../models/PaymentModel";
import { MyContext, Payment, TextResponse } from "../../types";

export const addPaymentHandler = async (
  _parents: never,
  args: Payment,
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const payment = new PaymentModel({
      ...args,
      createdAt: dayjs().format(DATE_FORMAT),
    });
    await payment.save();
    return { data: "Added Payment Successfully" };
  }
};
