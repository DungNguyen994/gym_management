"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisitHistoryHandler = void 0;
const constant_1 = require("../../constant");
const MemberModel_1 = require("../../models/MemberModel");
const VisitModel_1 = require("../../models/VisitModel");
const getVisitHistoryHandler = (_parents, _args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return { errors: constant_1.UnauthorizedError };
    const { role } = user;
    if (role === constant_1.User_Role.member)
        return { errors: constant_1.NoPermissionError };
    else {
        const visits = (yield VisitModel_1.VisitModel.find().exec());
        const members = (yield MemberModel_1.MemberModel.find().exec());
        visits.forEach((visit) => {
            const foundMember = members.find((member) => member.id === visit.memberId);
            visit.memberName =
                (foundMember === null || foundMember === void 0 ? void 0 : foundMember.firstName) && (foundMember === null || foundMember === void 0 ? void 0 : foundMember.lastName)
                    ? (foundMember === null || foundMember === void 0 ? void 0 : foundMember.firstName) + " " + (foundMember === null || foundMember === void 0 ? void 0 : foundMember.lastName)
                    : "";
        });
        return { data: visits };
    }
});
exports.getVisitHistoryHandler = getVisitHistoryHandler;
//# sourceMappingURL=getVisitHistory.js.map