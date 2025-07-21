import cors from "cors";
import { logger } from "./loggerConfig.js";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.MOBILE_DEV_ORIGIN,
];

export const CorsConfig = (app) => {
  try {
    app.use(
      cors({
        origin: (origin, callback) => {
          if (
            !origin ||
            allowedOrigins.includes(origin) ||
            process.env.NODE_ENV !== "production"
          ) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      })
    );
  } catch (error) {
    console.error("CORS config failed: ", error);
    logger.error(`CORS config failed: ${error}`);
  }
};
