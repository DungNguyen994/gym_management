import {
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { MembershipTypeModel } from "../../models/MembershipTypes";
import {
  ListMembershipTypeResponse,
  MembershipType,
  MyContext,
} from "../../types";

export const getMembershipTypesHandler = async (
  _parents: never,
  _args: never,
  { user }: MyContext
): Promise<ListMembershipTypeResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const membershipTypes =
      (await MembershipTypeModel.find().exec()) as MembershipType[];

    return { data: membershipTypes };
  }
};
