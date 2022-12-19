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
exports.holdMembershipHandler = void 0;
const constant_1 = require("../../constant");
const MembershipModel_1 = require("../../models/MembershipModel");
const holdMembershipHandler = (_parents, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return { errors: constant_1.UnauthorizedError };
    const { role } = user;
    if (role === constant_1.User_Role.member)
        return { errors: constant_1.NoPermissionError };
    else {
        yield MembershipModel_1.MembershipModel.findByIdAndUpdate(args.id, {
            status: constant_1.MEMBERSHIP_STATUS.HOLD,
        });
        return { data: "Hold Membership Successfully" };
    }
});
exports.holdMembershipHandler = holdMembershipHandler;
//# sourceMappingURL=holdMembership.js.map