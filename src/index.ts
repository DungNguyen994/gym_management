import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginDrainHttpServer,
} from "apollo-server-core";
import express, { Response } from "express";
import http from "http";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { expressjwt, Request } from "express-jwt";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOptions";
import cors from "cors";
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
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: ["https://gymbot.onrender.com/"],
    })
  );
  server.applyMiddleware({ app, cors: corsOptions });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
}
startApolloServer().catch((e) => console.log(e));
