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
exports.changePasswordHandler = void 0;
const argon2_1 = require("argon2");
const constant_1 = require("../../constant");
const UserModel_1 = require("../../models/UserModel");
const argon2_2 = require("argon2");
const changePasswordHandler = (_parents, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return { errors: constant_1.UnauthorizedError };
    const { role } = user;
    if (role === constant_1.User_Role.member)
        return { errors: constant_1.NoPermissionError };
    else {
        const user = yield UserModel_1.UserModel.findById(args.id).exec();
        if (user === null || user === void 0 ? void 0 : user.password) {
            const isValid = yield (0, argon2_2.verify)(user.password, args.currentPassword);
            if (!isValid)
                return {
                    errors: {
                        type: constant_1.Error_Code.invalid,
                        pointer: "password",
                        message: "Your current password is incorrect",
                    },
                };
            else {
                const hashedPassword = yield (0, argon2_1.hash)(args.password);
                yield UserModel_1.UserModel.findByIdAndUpdate(args.id, {
                    password: hashedPassword,
                });
                return { data: "Updated Pasword Successfully" };
            }
        }
        else {
            return {
                errors: {
                    type: constant_1.Error_Code.invalid,
                    pointer: "password",
                    message: "Your current password is incorrect",
                },
            };
        }
    }
});
exports.changePasswordHandler = changePasswordHandler;
//# sourceMappingURL=changePassword.js.map