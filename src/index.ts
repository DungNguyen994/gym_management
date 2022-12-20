import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import express, { Response } from "express";
import { expressjwt, Request } from "express-jwt";
import http from "http";
import mongoose from "mongoose";
import "reflect-metadata";
import { scheduleJob } from "node-schedule";
import { corsOptions } from "./config/corsOptions";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { updateRemainingDays } from "./utils";
dotenv.config();
async function startApolloServer() {
  const app = express();
  app.use(cookieParser());
  app.use(
    expressjwt({
      secret: process.env.ACCESS_TOKEN_SECRET || "",
      algorithms: ["HS256"],
      credentialsRequired: false,
    })
  );
  const httpServer = http.createServer(app);
  const { DB_URL, DB_NAME } = process.env;

  mongoose.connect(DB_URL as string, { dbName: DB_NAME });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }: { req: Request; res: Response }) => {
      const user = req.auth || null;
      return { user, res, req };
    },
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
  scheduleJob("0 0 0 * * *", () => {
    updateRemainingDays();
  });

  server.applyMiddleware({ app, cors: corsOptions });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
}
startApolloServer().catch((e) => console.log(e));
