import jwt from "jsonwebtoken";
import { logger } from "../config/loggerConfig.js";
import { AppError } from "../utils/AppError.js";
import { JSON_SECRET } from "../config/DotEnvConfig.js";

export const CheckAuth = async (req, _, next) => {
  if (!JSON_SECRET) {
    console.log("Jwt Secret Key is not found ", JSON_SECRET);
    logger.error("Jwt Secret Key is not found " + JSON_SECRET);
    throw new AppError(`Internal Server Error`, 500);
  }
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const message = `Token not provided or invalid format. Header: ${authHeader}`;
      logger.error(message);
      return next(new AppError(message, 401));
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JSON_SECRET);

    if (typeof decoded !== "string" && decoded.sub && decoded.email) {
      req.user = {
        sub: decoded.sub,
        email: decoded.email,
      };
      return next();
    } else {
      return next(new AppError("Invalid token payload", 401));
    }
  } catch (error) {
    logger.error("Error in checking auth: " + error?.message);
    return next(new AppError("Unauthorized access", 401));
  }
};
