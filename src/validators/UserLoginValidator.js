import { body } from "express-validator";
import { IsUserExists } from "../services/UserService.js";

export function userLoginValidator() {
  return [
    body("email")
      .isEmail()
      .trim()
      .toLowerCase()
      .notEmpty()
      .withMessage("Email Should Not Be Empty")
      .custom(async (email) => {
        const exists = await IsUserExists(email);
        if (!exists) {
          throw new Error(
            "Account With This Email Not Exists. You Should Try To Login First"
          );
        }
        return true;
      }),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password Should Not Be Empty")
      .isLength({ min: 5 }),
  ];
}