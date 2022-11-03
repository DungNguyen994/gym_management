import { MemberModel } from "../../models/MemberModel";
import { NoPermissionError } from "../../constant";
import { User_Role } from "../../constant";
import { UnauthorizedError } from "../../constant";
import { MyContext, ListMemberResponse, Member } from "../../types";

export const getMembersHandler = async (
  _parents: never,
  _args: never,
  { user }: MyContext
): Promise<ListMemberResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const members = (await MemberModel.find()) as Member[];
    return { data: members };
  }
};
