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
exports.logoutHandler = void 0;
const UserModel_1 = require("../models/UserModel");
const constant_1 = require("../constant");
const logoutHandler = (_parents, _args, { req, res }) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return {
            data: "Logout successfully",
        };
    const refreshToken = cookies.jwt;
    const foundUser = yield UserModel_1.UserModel.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true, maxAge: constant_1.ONE_DAY_TIME_IN_MS });
        return {
            data: "Logout successfully",
        };
    }
    yield foundUser.updateOne({ refreshToken: "" });
    res.clearCookie("jwt", { httpOnly: true, maxAge: constant_1.ONE_DAY_TIME_IN_MS });
    return {
        data: "Logout successfully",
    };
});
exports.logoutHandler = logoutHandler;
//# sourceMappingURL=logoutHandler.js.map