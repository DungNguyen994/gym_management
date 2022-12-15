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
exports.activateMembershipHandler = void 0;
const constant_1 = require("../../constant");
const MemberModel_1 = require("../../models/MemberModel");
const immer_1 = __importDefault(require("immer"));
const dayjs_1 = __importDefault(require("dayjs"));
const activateMembershipHandler = (_parents, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return { errors: constant_1.UnauthorizedError };
    const { role } = user;
    if (role === constant_1.User_Role.member)
        return { errors: constant_1.NoPermissionError };
    else {
        const member = yield MemberModel_1.MemberModel.findById(args.memberId);
        if (member) {
            const { memberships } = member.toObject();
            const newMembeships = (0, immer_1.default)(memberships, (draftState) => {
                const foundMembershipIndex = draftState.findIndex((membership) => (0, dayjs_1.default)(membership.startDate).isSame((0, dayjs_1.default)(args.startDate), "day"));
                draftState.forEach((membership) => {
                    membership.status = "H";
                });
                if (foundMembershipIndex >= 0) {
                    draftState[foundMembershipIndex].status = "A";
                    if (draftState[foundMembershipIndex].holdDate) {
                        const holdingDays = (0, dayjs_1.default)().diff((0, dayjs_1.default)(draftState[foundMembershipIndex].holdDate), "day");
                        draftState[foundMembershipIndex].endDate = (0, dayjs_1.default)(draftState[foundMembershipIndex].endDate)
                            .add(holdingDays, "day")
                            .format(constant_1.DATE_FORMAT);
                    }
                }
            });
            yield MemberModel_1.MemberModel.findByIdAndUpdate(args.memberId, {
                memberships: newMembeships,
            });
            return { data: "Activate membership Successfully" };
        }
        else
            return {
                errors: { message: "Member not found!", type: constant_1.Error_Code.not_found },
            };
    }
});
exports.activateMembershipHandler = activateMembershipHandler;
//# sourceMappingURL=activateMembership.js.map