import { Error } from "./types";

enum Error_Code {
  not_found = "not_found",
  unauthorized = "unauthorized",
  forbidden = "forbidden",
  invalid = "invalid",
}
enum User_Role {
  admin = "admin",
  employee = "employee",
  member = "member",
}
const NoPermissionError: Error = {
  type: Error_Code.forbidden,
  message: "You have no permission for this operation",
};
const UnauthorizedError: Error = {
  type: Error_Code.unauthorized,
  message: "Please login and try again",
};
export const TOKEN_EXPIRE_TIME = 60 * 60;
export { Error_Code, User_Role, NoPermissionError, UnauthorizedError };

export const ONE_DAY_TIME_IN_MS = 24 * 60 * 60 * 1000;

export const DATE_FORMAT = "YYYY/MM/DD HH:mm:ss";
