import { UnauthorizedError } from "./constant";
import { getUser } from "./resolverHandlers/getUser";
import { getUsers } from "./resolverHandlers/getUsers";
import { loginHandler } from "./resolverHandlers/login";
import { logoutHandler } from "./resolverHandlers/logoutHandler";
import { addMemberHandler } from "./resolverHandlers/members/addMember";
import { getMembersHandler } from "./resolverHandlers/members/getMembers";
import { updateMemberHandler } from "./resolverHandlers/members/updateMember";
import { refreshTokenHandler } from "./resolverHandlers/refreshTokenHandler";
import { registerHandler } from "./resolverHandlers/register";
import { removeUserHandler } from "./resolverHandlers/removeUser";
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
  },
  Mutation: {
    register: registerHandler,
    login: loginHandler,
    removeUser: removeUserHandler,
    addMember: addMemberHandler,
    updateMember: updateMemberHandler,
  },
};
