import { UnauthorizedError } from "./constant";
import { getUser } from "./resolverHandlers/getUser";
import { getUsers } from "./resolverHandlers/getUsers";
import { getInventoryHandler } from "./resolverHandlers/inventory/getInventory";
import { stockInHandler } from "./resolverHandlers/inventory/stockIn";
import { loginHandler } from "./resolverHandlers/login";
import { logoutHandler } from "./resolverHandlers/logoutHandler";
import { activateMembershipHandler } from "./resolverHandlers/members/activateMembership";
import { addMemberHandler } from "./resolverHandlers/members/addMember";
import { deleteMemberHandler } from "./resolverHandlers/members/deleteMember";
import { getMemberHandler } from "./resolverHandlers/members/getMember";
import { getMembersHandler } from "./resolverHandlers/members/getMembers";
import { holdMembershipHandler } from "./resolverHandlers/members/holdMembership";
import { updateMemberHandler } from "./resolverHandlers/members/updateMember";
import { addPaymentHandler } from "./resolverHandlers/pos/addPayment";
import { addProductHandler } from "./resolverHandlers/products/addProduct";
import { deleteProductHandler } from "./resolverHandlers/products/deleteProduct";
import { getProductHandler } from "./resolverHandlers/products/getProduct";
import { getProductsHandler } from "./resolverHandlers/products/getProducts";
import { updateProductHandler } from "./resolverHandlers/products/updateProduct";
import { refreshTokenHandler } from "./resolverHandlers/refreshTokenHandler";
import { registerHandler } from "./resolverHandlers/register";
import { removeUserHandler } from "./resolverHandlers/removeUser";
import { checkInHandler } from "./resolverHandlers/visitHistory/checkIn";
import { getVisitHistoryHandler } from "./resolverHandlers/visitHistory/getVisitHistory";
import { User, UserResponse } from "./types";

interface MyContext {
  user: User;
  res: Response;
}

export const resolvers = {
  Query: {
    users: getUsers,
    user: getUser,
    refreshToken: refreshTokenHandler,
    logout: logoutHandler,
    me: async (
      _parents: never,
      _args: never,
      { user }: MyContext
    ): Promise<UserResponse> => {
      if (!user) return { errors: UnauthorizedError };
      return { data: user };
    },
    members: getMembersHandler,
    member: getMemberHandler,
    products: getProductsHandler,
    product: getProductHandler,
    inventory: getInventoryHandler,
    visitHistory: getVisitHistoryHandler,
  },
  Mutation: {
    register: registerHandler,
    login: loginHandler,
    removeUser: removeUserHandler,
    addMember: addMemberHandler,
    updateMember: updateMemberHandler,
    deleteMember: deleteMemberHandler,
    holdMembership: holdMembershipHandler,
    activateMembership: activateMembershipHandler,
    addProduct: addProductHandler,
    deleteProduct: deleteProductHandler,
    updateProduct: updateProductHandler,
    stockIn: stockInHandler,
    addPayment: addPaymentHandler,
    checkIn: checkInHandler,
  },
};
