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
exports.getRemainingDays = exports.getMembershipStatus = exports.updateRemainingDays = void 0;
const constant_1 = require("./constant");
const MembershipModel_1 = require("./models/MembershipModel");
const updateRemainingDays = () => __awaiter(void 0, void 0, void 0, function* () {
    const activateMemberships = yield MembershipModel_1.MembershipModel.find({
        status: constant_1.MEMBERSHIP_STATUS.ACTIVE,
    }).exec();
    activateMemberships.forEach((membership) => {
        if (membership.remainingDays && membership.remainingDays > 0) {
            membership.remainingDays = Number(membership.remainingDays) - 1;
        }
        else {
            membership.status = constant_1.MEMBERSHIP_STATUS.EXPIRED;
        }
        membership.save();
    });
});
exports.updateRemainingDays = updateRemainingDays;
const getMembershipStatus = (memberships) => {
    const isActive = memberships.some((membership) => membership.status === constant_1.MEMBERSHIP_STATUS.ACTIVE);
    const isExpired = memberships.every((membership) => membership.status === constant_1.MEMBERSHIP_STATUS.EXPIRED);
    return isActive
        ? constant_1.MEMBERSHIP_STATUS.ACTIVE
        : isExpired
            ? constant_1.MEMBERSHIP_STATUS.EXPIRED
            : constant_1.MEMBERSHIP_STATUS.HOLD;
};
exports.getMembershipStatus = getMembershipStatus;
const getRemainingDays = (memberships) => memberships.reduce((total, membership) => {
    return total + Number(membership.remainingDays);
}, 0);
exports.getRemainingDays = getRemainingDays;
//# sourceMappingURL=utils.js.map