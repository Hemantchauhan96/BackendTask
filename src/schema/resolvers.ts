import { Authentication } from "./services/Authentication";

export const resolvers = {
  Query: {
    users: Authentication.users,
  },
  Mutation: {
    signUp: Authentication.signup,
    signin: Authentication.signin,
    changePassword: Authentication.changePassword,
  },
};
