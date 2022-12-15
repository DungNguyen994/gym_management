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
exports.registerHandler = void 0;
const argon2_1 = require("argon2");
const jsonwebtoken_1 = require("jsonwebtoken");
const constant_1 = require("../constant");
const constant_2 = require("../constant");
const UserModel_1 = require("../models/UserModel");
const registerHandler = (_parents, args, { res }) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstName, lastName, phoneNumber, email } = args;
    const hashedPassword = yield (0, argon2_1.hash)(password);
    const role = constant_2.User_Role.member;
    const foundUserByUsername = yield UserModel_1.UserModel.findOne({ username }).exec();
    if (foundUserByUsername)
        return {
            errors: {
                type: constant_1.Error_Code.invalid,
                message: "The username is already exist!. Please choose a different username.",
                pointer: "username",
            },
        };
    const foundUserByPhoneNumber = yield UserModel_1.UserModel.findOne({
        phoneNumber,
    }).exec();
    if (foundUserByPhoneNumber)
        return {
            errors: {
                type: constant_1.Error_Code.invalid,
                message: "The Phone Number is already exist!. Please choose a different number or log in instead.",
                pointer: "phoneNumber",
            },
        };
    const fullName = firstName + " " + lastName;
    const userInfo = { fullName, role, username };
    const accessToken = (0, jsonwebtoken_1.sign)({ user: userInfo }, process.env.ACCESS_TOKEN_SECRET || "", { expiresIn: "10m" });
    const refreshToken = (0, jsonwebtoken_1.sign)({ user: userInfo }, process.env.REFRESH_TOKEN_SECRET || "", { expiresIn: "1d" });
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: constant_1.ONE_DAY_TIME_IN_MS,
    });
    const newUser = new UserModel_1.UserModel({
        username,
        password: hashedPassword,
        role,
        firstName,
        lastName,
        phoneNumber,
        email,
        refreshToken,
    });
    yield newUser.save();
    return { data: accessToken };
});
exports.registerHandler = registerHandler;
//# sourceMappingURL=register.js.map