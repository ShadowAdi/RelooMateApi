import { validationResult } from "express-validator";
import { AppError } from "../utils/AppError.js";

export const ValidateRequest = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    if (!errors.isEmpty()) {
      const [firstError] = errors.array();
      return next(new AppError(firstError.msg, 400));
    }
  }
  next();
};
