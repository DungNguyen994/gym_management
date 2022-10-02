import { ApolloServer, gql } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginDrainHttpServer,
} from "apollo-server-core";
import express from "express";
import http from "http";
import mongoose, { Schema } from "mongoose";

const typeDefs = gql`
  type User {
    firstName: String
    lastName: String
    password: String
    email: String
    phoneNumber: String
  }

  type Query {
    users: [User]
  }
`;
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  phoneNumber: String,
});
const User = mongoose.model("users", userSchema);

const resolvers = {
  Query: {
    users: async () => await User.find(),
  },
};

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  mongoose.connect(
    "mongodb+srv://dungnguyen:H91GDLuuIK55xf2U@cluster0.csixpj4.mongodb.net/?retryWrites=true&w=majority",
    { dbName: "gym" }
  );
  console.log((await User.find()).map((i) => i.firstName));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer();
