import mongoose from "mongoose";
import { logger } from "../config/loggerConfig.js";
import { MONGODB_URL } from "../config/DotEnvConfig.js";

export const DBConnect = async (server) => {
  if (!MONGODB_URL) {
    server.close(() => {
      logger.warn("Server closed because connecting string is not found");
      process.exit(1);
    });
  }
  try {
    await mongoose.connect(MONGODB_URL);
    logger.info("✅ Connected to MongoDB.");
  } catch (error) {
    logger.error("DB connection failed:", error);
    console.error("DB connection failed:", error);
    server.close(() => {
      logger.warn("Server closed due to DB connection failure.");
      process.exit(1);
    });
  }
};