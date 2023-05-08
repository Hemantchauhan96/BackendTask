import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import { typeDefs } from "./src/schema/typeDefs";
import { resolvers } from "./src/schema/resolvers";
import { sequelize } from "./sequelize";
import { UserModel, MovieModel, ReviewModel, User } from "./src/models";
import { Authentication } from "./src/schema/services/Authentication";

export type MyContext = {
  user: User;
};

dotenv.config();

(async () => {
  await sequelize.addModels([UserModel, MovieModel, ReviewModel]);
  await sequelize.sync();

  const server = new ApolloServer<MyContext>({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      try {
        const token = req.headers.authorization || "";
        const user = await Authentication.getUser(token);
        return { user };
      } catch (err) {
        console.log(err);
      }
    },
  });
  console.log(`🚀 Server ready at ${url}`);
})();
