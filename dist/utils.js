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
exports.getRemainingDays = exports.getMembershipStatus = exports.activateOnHoldMembership = exports.updateRemainingDays = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const constant_1 = require("./constant");
const MembershipModel_1 = require("./models/MembershipModel");
const updateRemainingDays = () => __awaiter(void 0, void 0, void 0, function* () {
    const activeMemberships = yield MembershipModel_1.MembershipModel.find({
        status: constant_1.MEMBERSHIP_STATUS.ACTIVE,
    }).exec();
    activeMemberships.forEach((membership) => {
        if (membership.remainingDays && membership.remainingDays > 0) {
            membership.remainingDays = Number(membership.remainingDays) - 1;
        }
        else {
            membership.status = constant_1.MEMBERSHIP_STATUS.EXPIRED;
        }
        membership.save();
    });
    console.log("Updated remaining days for memberships successfully");
});
exports.updateRemainingDays = updateRemainingDays;
const activateOnHoldMembership = () => __awaiter(void 0, void 0, void 0, function* () {
    const onHoldMemberships = yield MembershipModel_1.MembershipModel.find({
        status: constant_1.MEMBERSHIP_STATUS.HOLD,
    }).exec();
    onHoldMemberships.forEach((membership) => {
        if (!membership.holdDate &&
            (0, dayjs_1.default)(membership.startDate).isSame((0, dayjs_1.default)(), "day")) {
            membership.status = constant_1.MEMBERSHIP_STATUS.ACTIVE;
        }
        membership.save();
    });
    console.log("Activate on hold memberships successfully");
});
exports.activateOnHoldMembership = activateOnHoldMembership;
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