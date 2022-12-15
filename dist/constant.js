"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATE_FORMAT = exports.ONE_DAY_TIME_IN_MS = exports.UnauthorizedError = exports.NoPermissionError = exports.User_Role = exports.Error_Code = exports.TOKEN_EXPIRE_TIME = void 0;
var Error_Code;
(function (Error_Code) {
    Error_Code["not_found"] = "not_found";
    Error_Code["unauthorized"] = "unauthorized";
    Error_Code["forbidden"] = "forbidden";
    Error_Code["invalid"] = "invalid";
})(Error_Code || (Error_Code = {}));
exports.Error_Code = Error_Code;
var User_Role;
(function (User_Role) {
    User_Role["admin"] = "admin";
    User_Role["employee"] = "employee";
    User_Role["member"] = "member";
})(User_Role || (User_Role = {}));
exports.User_Role = User_Role;
const NoPermissionError = {
    type: Error_Code.forbidden,
    message: "You have no permission for this operation",
};
exports.NoPermissionError = NoPermissionError;
const UnauthorizedError = {
    type: Error_Code.unauthorized,
    message: "Please login and try again",
};
exports.UnauthorizedError = UnauthorizedError;
exports.TOKEN_EXPIRE_TIME = 60 * 60;
exports.ONE_DAY_TIME_IN_MS = 24 * 60 * 60 * 1000;
exports.DATE_FORMAT = "YYYY/MM/DD HH:mm:ss";
//# sourceMappingURL=constant.js.map