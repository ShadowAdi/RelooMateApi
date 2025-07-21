import "./config/DotEnvConfig.js";
import express from "express";
import { CorsConfig } from "./config/corsConfig.js";
import { CustomErrorHandler } from "./middlewares/ErrorHandler.js";
import { AppError } from "./utils/AppError.js";
import UserRouter from "./routes/userRouter.js";
import { AppConnect } from "./config/AppConfig.js";

const app = express();

CorsConfig(app);
app.use(express.json());

app.use("/api", UserRouter);

app.use(CustomErrorHandler);

AppConnect(app);
