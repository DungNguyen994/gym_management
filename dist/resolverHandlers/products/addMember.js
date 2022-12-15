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
exports.addMemberHandler = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const PaymentModel_1 = require("../../models/PaymentModel");
const constant_1 = require("../../constant");
const MemberModel_1 = require("../../models/MemberModel");
const addMemberHandler = (_parents, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return { errors: constant_1.UnauthorizedError };
    const { role } = user;
    if (role === constant_1.User_Role.member)
        return { errors: constant_1.NoPermissionError };
    else {
        const memberships = [
            Object.assign(Object.assign({}, args.membership), { status: (0, dayjs_1.default)(args.membership.startDate).isAfter((0, dayjs_1.default)()) ? "H" : "A" }),
        ];
        const member = new MemberModel_1.MemberModel(Object.assign(Object.assign({}, args), { memberships }));
        const newMember = yield member.save();
        const payment = Object.assign(Object.assign({}, args.payment), { createdAt: (0, dayjs_1.default)().format(constant_1.DATE_FORMAT), memberId: newMember._id });
        const newPayment = new PaymentModel_1.PaymentModel(payment);
        yield newPayment.save();
        return { data: "Added Member Successfully" };
    }
});
exports.addMemberHandler = addMemberHandler;
//# sourceMappingURL=addMember.js.map