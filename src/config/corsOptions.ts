import { allowedOrigins } from "./allowedOrigins";

export const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
