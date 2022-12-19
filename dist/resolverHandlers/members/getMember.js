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
exports.getMemberHandler = void 0;
const MembershipModel_1 = require("../../models/MembershipModel");
const constant_1 = require("../../constant");
const MemberModel_1 = require("../../models/MemberModel");
const utils_1 = require("../../utils");
const utils_2 = require("../../utils");
const getMemberHandler = (_parents, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return { errors: constant_1.UnauthorizedError };
    const { role } = user;
    if (role === constant_1.User_Role.member)
        return { errors: constant_1.NoPermissionError };
    else {
        const member = yield MemberModel_1.MemberModel.findById(args.id).exec();
        const memberships = yield MembershipModel_1.MembershipModel.find({
            memberId: args.id,
        }).exec();
        const currentMembership = memberships.find((membership) => membership.status === constant_1.MEMBERSHIP_STATUS.ACTIVE);
        const _memberships = memberships.map((m) => (Object.assign(Object.assign({}, m.toObject()), { id: m._id.toString() })));
        const _member = Object.assign(Object.assign({}, member === null || member === void 0 ? void 0 : member.toObject()), { id: member === null || member === void 0 ? void 0 : member.id, status: (0, utils_1.getMembershipStatus)(_memberships), remainingDays: (0, utils_2.getRemainingDays)(_memberships), currentMembershipType: (currentMembership === null || currentMembership === void 0 ? void 0 : currentMembership.membershipType) || "", memberships: [..._memberships] });
        return {
            data: _member,
        };
    }
});
exports.getMemberHandler = getMemberHandler;
//# sourceMappingURL=getMember.js.map