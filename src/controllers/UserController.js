import { logger } from "../config/loggerConfig.js";
import { DummyData } from "../dummyData/dummyData.js";
import {
  CreateUserService,
  IsUserExists,
  LoginUserService,
} from "../services/UserService.js";
import { AppError } from "../utils/AppError.js";
import { CustomTryCatch } from "../utils/CustomTryCatch.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";

export const CreateUser = CustomTryCatch(async (request, response) => {
  const userData = request.body;
  const userCreated = await CreateUserService(userData);
  return response.status(201).json({
    success: true,
    message: "User Created successfully.",
    data: sanitizeUser(userCreated),
  });
});

export const LoginUser = CustomTryCatch(async (request, response) => {
  const userData = request.body;
  const { token, user } = await LoginUserService(userData);
  return response.status(200).json({
    success: true,
    message: "User Login successfully.",
    user: sanitizeUser(user),
    token,
  });
});

export const authenticatedUser = CustomTryCatch(async (request, response) => {
  const { user } = request;
  if (!user) {
    logger.error(`User Not Found in the request `, request?.user);
    throw new AppError(`You Are Not Authenticated`, 401);
  }
  const { email } = user;
  const userDetail = await IsUserExists(email);
  return response.status(200).json({
    success: true,
    user: sanitizeUser(userDetail),
  });
});

export const GetOnboardingSteps = CustomTryCatch(async (request, response) => {
  return response.status(200).json({
    success: true,
    steps: DummyData,
  });
});
