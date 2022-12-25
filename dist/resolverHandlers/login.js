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
exports.loginHandler = void 0;
const argon2_1 = require("argon2");
const jsonwebtoken_1 = require("jsonwebtoken");
const constant_1 = require("../constant");
const UserModel_1 = require("../models/UserModel");
const loginHandler = (_parents, args, { res }) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = args;
    const user = yield UserModel_1.UserModel.findOne({ username }).exec();
    if (!user) {
        return {
            errors: {
                type: constant_1.Error_Code.not_found,
                pointer: "username",
                message: "Username not found",
            },
        };
    }
    else if (user.password !== undefined) {
        const isValid = yield (0, argon2_1.verify)(user.password, password);
        if (!isValid)
            return {
                errors: {
                    type: constant_1.Error_Code.invalid,
                    pointer: "password",
                    message: "Your password is incorrect",
                },
            };
    }
    const userInfo = {
        username,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
    };
    const accessToken = (0, jsonwebtoken_1.sign)({ user: userInfo }, process.env.ACCESS_TOKEN_SECRET || "", { expiresIn: "2h" });
    const refreshToken = (0, jsonwebtoken_1.sign)({ user: userInfo }, process.env.REFRESH_TOKEN_SECRET || "", { expiresIn: "1d" });
    yield user.updateOne({ refreshToken });
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: constant_1.ONE_DAY_TIME_IN_MS,
    });
    return { data: accessToken };
});
exports.loginHandler = loginHandler;
//# sourceMappingURL=login.js.map