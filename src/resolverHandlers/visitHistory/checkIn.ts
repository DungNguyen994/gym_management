import dayjs from "dayjs";
import {
  DATE_FORMAT,
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { VisitModel } from "../../models/VisitModel";
import { MyContext, TextResponse } from "../../types";

export const checkInHandler = async (
  _parents: never,
  args: { memberId: string },
  { user }: MyContext
): Promise<TextResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const visit = new VisitModel({
      ...args,
      date: dayjs().format(DATE_FORMAT),
    });
    await visit.save();
    return { data: "Checked In Successfully" };
  }
};
