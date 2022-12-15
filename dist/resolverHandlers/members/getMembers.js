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
exports.getMembersHandler = void 0;
const MemberModel_1 = require("../../models/MemberModel");
const constant_1 = require("../../constant");
const constant_2 = require("../../constant");
const constant_3 = require("../../constant");
const getMembersHandler = (_parents, _args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return { errors: constant_3.UnauthorizedError };
    const { role } = user;
    if (role === constant_2.User_Role.member)
        return { errors: constant_1.NoPermissionError };
    else {
        const members = (yield MemberModel_1.MemberModel.find());
        return { data: members };
    }
});
exports.getMembersHandler = getMembersHandler;
//# sourceMappingURL=getMembers.js.map