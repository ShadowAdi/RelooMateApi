import { body } from "express-validator";
import { IsEmailTaken } from "../services/UserService.js";

export function CreateValidateUser() {
  return [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .toLowerCase()
      .isAlpha()
      .withMessage("Name must contain only alphabetical characters")
      .notEmpty()
      .withMessage("Name Should Not Be Empty"),
    body("email")
      .isEmail()
      .trim()
      .toLowerCase()
      .notEmpty()
      .withMessage("Email Should Not Be Empty")
      .custom(async (email) => {
        const exists = await IsEmailTaken(email);
        if (exists) {
          throw new Error("Email already in use");
        }
        return true;
      }),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password Should Not Be Empty")
      .isLength({ min: 6 }),
  ];
}
