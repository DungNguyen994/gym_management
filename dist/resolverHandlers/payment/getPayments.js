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
exports.getPaymentsHandler = void 0;
const PaymentModel_1 = require("../../models/PaymentModel");
const constant_1 = require("../../constant");
const MemberModel_1 = require("../../models/MemberModel");
const getPaymentsHandler = (_parents, _args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return { errors: constant_1.UnauthorizedError };
    const { role } = user;
    if (role === constant_1.User_Role.member)
        return { errors: constant_1.NoPermissionError };
    else {
        const payments = (yield PaymentModel_1.PaymentModel.find().exec());
        const members = (yield MemberModel_1.MemberModel.find().exec());
        payments.forEach((payment) => {
            const foundMember = members.find((member) => member.id === payment.memberId);
            if (foundMember)
                payment.memberName =
                    (foundMember === null || foundMember === void 0 ? void 0 : foundMember.firstName) + " " + (foundMember === null || foundMember === void 0 ? void 0 : foundMember.lastName) || "";
        });
        return { data: payments };
    }
});
exports.getPaymentsHandler = getPaymentsHandler;
//# sourceMappingURL=getPayments.js.map