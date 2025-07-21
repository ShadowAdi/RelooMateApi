import { AppError } from "./AppError.js";
import { logger } from "../config/loggerConfig.js";
import { JSON_SECRET } from "../config/DotEnvConfig.js";
import jwt from "jsonwebtoken";

export const TokenGenerator = async (payload) => {
  try {
    if (!JSON_SECRET) {
      console.log("Jwt Secret Key is not found ", JSON_SECRET);
      logger.error("Jwt Secret Key is not found " + JSON_SECRET);
      throw new AppError(`Internal Server Error`, 500);
    }
    const token = jwt.sign(payload, JSON_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log("Some Error in creating Token ", error);
    logger.error("Error in creating Token  " + error);
    throw new AppError(`Internal Server Error`, 500);
  }
};
