import cors from "cors";
import { Express } from "express";
import { logger } from "./loggerConfig.js";
export const CorsConfig = (app) => {
  try {
    app.use(
      cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
  } catch (error) {
    console.error("CORS config failed: ", error);
    logger.error(`CORS config failed: ${error}`)
  }
};