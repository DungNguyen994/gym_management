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
exports.removeUserHandler = void 0;
const constant_1 = require("../constant");
const constant_2 = require("../constant");
const UserModel_1 = require("../models/UserModel");
const removeUserHandler = (_parents, args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return { errors: constant_1.UnauthorizedError };
    if (user.role !== constant_2.User_Role.admin)
        return { errors: constant_1.NoPermissionError };
    const { username } = args;
    yield UserModel_1.UserModel.findOneAndDelete({ username });
    return { data: "Deleted user Successfully" };
});
exports.removeUserHandler = removeUserHandler;
//# sourceMappingURL=removeUser.js.map