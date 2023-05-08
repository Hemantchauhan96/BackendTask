import bcrypt from "bcrypt";
import { UserModel } from "../../models";
import { Payload, signToken, verifyToken } from "../../utils/jwt";
import { thrower } from "../../utils/errorThrower";
import { GraphQLError } from "graphql";
import {
  signupPayload,
  signinPayload,
  changePasswordPayload,
} from "../../types/Authentication";
const saltRounds = 10;
export const Authentication = {
  signup: async (_: undefined, args: signupPayload) => {
    try {
      args.password = await bcrypt.hash(args.password, saltRounds);
      const user = await UserModel.create(args);
      if (user) {
        const token = signToken({
          id: user.id,
          password: user.password,
          email: user.email,
        });
        Object.assign(user, { token });
        return user;
      }
    } catch (err) {
      if (err instanceof Error) {
        thrower(err);
      } else {
        throw new Error(`An unknown error occurred: ${err}`);
      }
    }
  },
  signin: async (_: undefined, args: signinPayload) => {
    try {
      const user = await UserModel.findOne({ where: { email: args.email } });
      if (!user) {
        throw new GraphQLError(`Authentication failed !`);
      }
      const isMatch = await bcrypt.compare(user.password, args.password);
      if (!isMatch) {
        throw new GraphQLError(`Authentication failed!`);
      }
      const token = signToken({
        id: user.id,
        password: user.password,
        email: user.email,
      });
      Object.assign(user, { token });
      return user;
    } catch (err) {
      if (err instanceof Error) {
        thrower(err);
      } else {
        throw new Error(`An unknown error occurred: ${err}`);
      }
    }
  },
  changePassword: async (_: undefined, args: changePasswordPayload) => {
    try {
      const user = await UserModel.findOne({ where: { email: args.email } });
      if (!user) {
        throw new GraphQLError(`Authentication failed !`);
      }
      const isMatch = await bcrypt.compare(user.password, args.oldPassword);
      if (!isMatch) {
        throw new GraphQLError(`Authentication failed!`);
      }
      const hashed = await bcrypt.hash(args.newPassword, saltRounds);
      user.password = hashed;
      const updatedUser = await user.save();
      const token = signToken({
        id: updatedUser.id,
        password: updatedUser.password,
        email: updatedUser.email,
      });
      Object.assign(updatedUser, { token });
      return updatedUser;
    } catch (err) {
      if (err instanceof Error) {
        thrower(err);
      } else {
        throw new Error(`An unknown error occurred: ${err}`);
      }
    }
  },
  getUser: async (bearerToken: string) => {
    try {
      if (!bearerToken) return null;
      const token = bearerToken.split(" ")[1];
      const payload = verifyToken(token);
      const user = await UserModel.findByPk((payload as Payload)?.id);

      if (!user || user.password !== (payload as Payload)?.password) {
        return null;
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  },
  users: () => UserModel.findAll(),
};
