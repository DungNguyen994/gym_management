import {
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { MemberModel } from "../../models/MemberModel";
import { Member, MemberResponse, MyContext } from "../../types";

export const getMemberHandler = async (
  _parents: never,
  args: { id: string },
  { user }: MyContext
): Promise<MemberResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const member = (await MemberModel.findById(args.id)) as Member;
    return { data: member };
  }
};
