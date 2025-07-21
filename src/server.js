import "./config/DotEnvConfig.js";
import express from "express";
import { CorsConfig } from "./config/corsConfig.js";
import { AppConnect } from "./config/appConfigRunner.js";
import UserRouter from "./routes/userRouter.js";
import { CustomErrorHandler } from "./middlewares/ErrorHandler.js";
import { AppError } from "./utils/AppError.js";

const app = express();

CorsConfig(app);
app.use(express.json());

app.use("/api/user", UserRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(CustomErrorHandler);

AppConnect(app);