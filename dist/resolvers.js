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
exports.resolvers = void 0;
const constant_1 = require("./constant");
const getUser_1 = require("./resolverHandlers/getUser");
const getUsers_1 = require("./resolverHandlers/getUsers");
const getInventory_1 = require("./resolverHandlers/inventory/getInventory");
const stockIn_1 = require("./resolverHandlers/inventory/stockIn");
const login_1 = require("./resolverHandlers/login");
const logoutHandler_1 = require("./resolverHandlers/logoutHandler");
const activateMembership_1 = require("./resolverHandlers/members/activateMembership");
const addMember_1 = require("./resolverHandlers/members/addMember");
const deleteMember_1 = require("./resolverHandlers/members/deleteMember");
const getMember_1 = require("./resolverHandlers/members/getMember");
const getMembers_1 = require("./resolverHandlers/members/getMembers");
const holdMembership_1 = require("./resolverHandlers/members/holdMembership");
const updateMember_1 = require("./resolverHandlers/members/updateMember");
const addProduct_1 = require("./resolverHandlers/products/addProduct");
const deleteProduct_1 = require("./resolverHandlers/products/deleteProduct");
const getProduct_1 = require("./resolverHandlers/products/getProduct");
const getProducts_1 = require("./resolverHandlers/products/getProducts");
const updateProduct_1 = require("./resolverHandlers/products/updateProduct");
const refreshTokenHandler_1 = require("./resolverHandlers/refreshTokenHandler");
const register_1 = require("./resolverHandlers/register");
const removeUser_1 = require("./resolverHandlers/removeUser");
exports.resolvers = {
    Query: {
        users: getUsers_1.getUsers,
        user: getUser_1.getUser,
        refreshToken: refreshTokenHandler_1.refreshTokenHandler,
        logout: logoutHandler_1.logoutHandler,
        me: (_parents, _args, { user }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!user)
                return { errors: constant_1.UnauthorizedError };
            return { data: user };
        }),
        members: getMembers_1.getMembersHandler,
        member: getMember_1.getMemberHandler,
        products: getProducts_1.getProductsHandler,
        product: getProduct_1.getProductHandler,
        inventory: getInventory_1.getInventoryHandler,
    },
    Mutation: {
        register: register_1.registerHandler,
        login: login_1.loginHandler,
        removeUser: removeUser_1.removeUserHandler,
        addMember: addMember_1.addMemberHandler,
        updateMember: updateMember_1.updateMemberHandler,
        deleteMember: deleteMember_1.deleteMemberHandler,
        holdMembership: holdMembership_1.holdMembershipHandler,
        activateMembership: activateMembership_1.activateMembershipHandler,
        addProduct: addProduct_1.addProductHandler,
        deleteProduct: deleteProduct_1.deleteProductHandler,
        updateProduct: updateProduct_1.updateProductHandler,
        stockIn: stockIn_1.stockInHandler,
    },
};
//# sourceMappingURL=resolvers.js.map