import {
  NoPermissionError,
  UnauthorizedError,
  User_Role,
} from "../../constant";
import { MemberModel } from "../../models/MemberModel";
import { VisitModel } from "../../models/VisitModel";
import {
  Member,
  MyContext,
  VisitHistory,
  VisitHistoryResponse,
} from "../../types";

export const getVisitHistoryHandler = async (
  _parents: never,
  _args: never,
  { user }: MyContext
): Promise<VisitHistoryResponse> => {
  if (!user) return { errors: UnauthorizedError };
  const { role } = user;
  if (role === User_Role.member) return { errors: NoPermissionError };
  else {
    const visits = (await VisitModel.find().exec()) as VisitHistory[];
    const members = (await MemberModel.find().exec()) as Member[];
    visits.forEach((visit) => {
      const foundMember = members.find(
        (member) => member.id === visit.memberId
      );
      visit.memberName =
        foundMember?.firstName + " " + foundMember?.lastName || "";
    });
    return { data: visits };
  }
};
