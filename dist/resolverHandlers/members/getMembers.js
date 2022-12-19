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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMembersHandler = void 0;
const MembershipModel_1 = require("../../models/MembershipModel");
const constant_1 = require("../../constant");
const MemberModel_1 = require("../../models/MemberModel");
const immer_1 = __importDefault(require("immer"));
const utils_1 = require("../../utils");
const getMembersHandler = (_parents, _args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return { errors: constant_1.UnauthorizedError };
    const { role } = user;
    if (role === constant_1.User_Role.member)
        return { errors: constant_1.NoPermissionError };
    else {
        const members = (yield MemberModel_1.MemberModel.find());
        const memberships = (yield MembershipModel_1.MembershipModel.find());
        const _members = (0, immer_1.default)(members, (draft) => {
            draft.forEach((member) => {
                const memberMemberships = memberships.filter((membership) => membership.memberId === member.id);
                const currentMembership = memberMemberships.find((membership) => membership.status === constant_1.MEMBERSHIP_STATUS.ACTIVE);
                member.currentMembershipType = (currentMembership === null || currentMembership === void 0 ? void 0 : currentMembership.membershipType) || "";
                member.status = (0, utils_1.getMembershipStatus)(memberMemberships);
                member.remainingDays = (0, utils_1.getRemainingDays)(memberMemberships);
            });
            return draft;
        });
        return { data: _members };
    }
});
exports.getMembersHandler = getMembersHandler;
//# sourceMappingURL=getMembers.js.map