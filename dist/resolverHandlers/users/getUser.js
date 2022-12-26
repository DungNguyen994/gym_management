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
exports.getUser = void 0;
const constant_1 = require("../../constant");
const UserModel_1 = require("../../models/UserModel");
const getUser = (_parents, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = user === null || user === void 0 ? void 0 : user.user;
    if (role !== constant_1.User_Role.admin)
        return { errors: constant_1.NoPermissionError };
    else {
        const _user = (yield UserModel_1.UserModel.findOne({
            username: args.username,
        }).exec());
        if (_user)
            return { data: _user };
        else
            return {
                errors: {
                    type: constant_1.Error_Code.not_found,
                    pointer: "username",
                    message: "username not found",
                },
            };
    }
});
exports.getUser = getUser;
//# sourceMappingURL=getUser.js.map