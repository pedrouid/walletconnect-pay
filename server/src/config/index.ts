import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV || "development";
const debug = env !== "production";

export default {
  env: env,
  debug: debug,
  port: process.env.PORT || env === "production" ? 5000 : 5001,
  pinata: {
    key: process.env.PINATA_API_KEY,
    secret: process.env.PINATA_API_SECRET
  }
};
