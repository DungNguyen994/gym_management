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
exports.refreshTokenHandler = void 0;
const UserModel_1 = require("../models/UserModel");
const constant_1 = require("../constant");
const jsonwebtoken_1 = require("jsonwebtoken");
const refreshTokenHandler = (parents, args, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return {
            errors: {
                type: constant_1.Error_Code.unauthorized,
                message: "You do not have permission!.",
            },
        };
    const refreshToken = cookies.jwt;
    const foundUser = yield UserModel_1.UserModel.findOne({ refreshToken }).exec();
    if (!foundUser)
        return {
            errors: {
                type: constant_1.Error_Code.forbidden,
                message: "Please Login and try again!",
            },
        };
    const { username, role } = foundUser;
    let accessToken;
    (0, jsonwebtoken_1.verify)(refreshToken, process.env.REFRESH_TOKEN_SECRET || "", (err, decoded) => {
        var _a;
        if (err || username !== ((_a = decoded.user) === null || _a === void 0 ? void 0 : _a.username))
            return {
                errors: {
                    type: constant_1.Error_Code.forbidden,
                    message: "Please Login and try again!",
                },
            };
        accessToken = (0, jsonwebtoken_1.sign)({ user: { username, role } }, process.env.ACCESS_TOKEN_SECRET || "", { expiresIn: "30s" });
    });
    return { data: accessToken };
});
exports.refreshTokenHandler = refreshTokenHandler;
//# sourceMappingURL=refreshToken.js.map