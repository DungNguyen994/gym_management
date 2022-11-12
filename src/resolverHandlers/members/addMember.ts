import dayjs from "dayjs";
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
    const notes =
      args.notes?.map((i) => ({
        ...i,
        createdAt: dayjs().format(DATE_FORMAT),
      })) || [];
    const payment = { ...args.payment, createdAt: dayjs().format(DATE_FORMAT) };
    const member = new MemberModel({
      ...args,
      notes: notes,
      payments: [payment],
    });
    await member.save();
    return { data: "Added Member Successfully" };
  }
};
