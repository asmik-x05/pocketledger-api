import dotenv from "dotenv";

dotenv.config();

const config = {
  name: process.env.NAME ?? "",
  port: process.env.PORT ?? 8000,
  mongodb_url: process.env.MONGODB_URL ?? "",
  jwt_secret: process.env.JWT_SECRET ?? "",
  app_url: process.env.APP_URL ?? "",
  version: process.env.VERSION ?? "",
};

export default config;