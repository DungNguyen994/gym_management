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
exports.updateMemberHandler = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const constant_1 = require("../../constant");
const MemberModel_1 = require("../../models/MemberModel");
const MembershipModel_1 = require("../../models/MembershipModel");
const PaymentModel_1 = require("../../models/PaymentModel");
const updateMemberHandler = (_parents, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return { errors: constant_1.UnauthorizedError };
    const { role } = user;
    if (role === constant_1.User_Role.member)
        return { errors: constant_1.NoPermissionError };
    else {
        yield MemberModel_1.MemberModel.findByIdAndUpdate(args.id, args);
        const { newMembership, payment } = args;
        if (newMembership) {
            const { startDate, endDate } = newMembership;
            const _newMembership = new MembershipModel_1.MembershipModel(Object.assign(Object.assign({}, newMembership), { remainingDays: (0, dayjs_1.default)(endDate).diff((0, dayjs_1.default)(startDate), "day"), memberId: args.id }));
            yield _newMembership.save();
        }
        if (payment) {
            const newPayment = new PaymentModel_1.PaymentModel(Object.assign(Object.assign({}, args.payment), { createdAt: (0, dayjs_1.default)().format(constant_1.DATE_FORMAT), memberId: args.id }));
            yield newPayment.save();
        }
        return { data: "Updated Member Successfully" };
    }
});
exports.updateMemberHandler = updateMemberHandler;
//# sourceMappingURL=updateMember.js.map