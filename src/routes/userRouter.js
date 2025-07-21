import express from "express";
import { CreateValidateUser } from "../validators/UserCreateValidator.js";
import { userLoginValidator } from "../validators/UserLoginValidator.js";
import { ValidateRequest } from "../middlewares/ValidateRequest.js";
import {
  authenticatedUser,
  CreateUser,
  GetOnboardingSteps,
  LoginUser,
} from "../controllers/UserController.js";
import { CheckAuth } from "../middlewares/AuthMiddleware.js";

const UserRouter = express.Router();

UserRouter.post("/register", CreateValidateUser(), ValidateRequest, CreateUser);
UserRouter.post("/login", userLoginValidator(), ValidateRequest, LoginUser);
UserRouter.use(CheckAuth);
UserRouter.get("/profile", authenticatedUser);
UserRouter.get("/onboarding", GetOnboardingSteps);


export default UserRouter;
