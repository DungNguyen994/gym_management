"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const graphql_1 = require("graphql");
const auth = function (req, _res, next) {
    const token = req.headers.authorization || "";
    try {
        const { user } = (0, jwt_decode_1.default)(token);
        if (user)
            req.auth = { user };
        else {
            throw new graphql_1.GraphQLError("Please Login and try again.", {
                extensions: {
                    code: "UNAUTHENTICATED",
                },
            });
        }
    }
    catch (e) {
        throw new graphql_1.GraphQLError("Please Login and try again.", {
            extensions: {
                code: "UNAUTHENTICATED",
            },
        });
    }
    next();
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map