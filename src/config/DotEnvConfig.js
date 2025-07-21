import { configDotenv } from "dotenv";
configDotenv();

export const PORT = process.env.PORT || 3000;
export const MONGODB_URL = process.env.MONGODB_URL;
export const JSON_SECRET = process.env.JSON_SECRET;