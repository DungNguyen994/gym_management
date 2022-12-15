"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const apollo_server_express_1 = require("apollo-server-express");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_jwt_1 = require("express-jwt");
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
require("reflect-metadata");
const corsOptions_1 = require("./config/corsOptions");
const resolvers_1 = require("./resolvers");
const typeDefs_1 = require("./typeDefs");
dotenv.config();
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use((0, cookie_parser_1.default)());
        app.use((0, express_jwt_1.expressjwt)({
            secret: process.env.ACCESS_TOKEN_SECRET || "",
            algorithms: ["HS256"],
            credentialsRequired: false,
        }));
        const httpServer = http_1.default.createServer(app);
        const { DB_URL, DB_NAME } = process.env;
        mongoose_1.default.connect(DB_URL, { dbName: DB_NAME });
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: typeDefs_1.typeDefs,
            resolvers: resolvers_1.resolvers,
            context: ({ req, res }) => {
                const user = req.auth || null;
                return { user, res, req };
            },
            csrfPrevention: true,
            cache: "bounded",
            plugins: [
                (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
                (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true }),
            ],
        });
        yield server.start();
        server.applyMiddleware({ app, cors: corsOptions_1.corsOptions });
        yield new Promise((resolve) => httpServer.listen({ port: process.env.PORT }, resolve));
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
    });
}
startApolloServer().catch((e) => console.log(e));
//# sourceMappingURL=index.js.map