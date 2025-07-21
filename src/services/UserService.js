import { logger } from "../config/loggerConfig.js";
import { UserModel } from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import { AppError } from "../utils/AppError.js";
import { TokenGenerator } from "../utils/TokenGenerator.js";

export const CreateUserService = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new UserModel({
      email: userData.email,
      name: userData.name,
      password: hashedPassword,
    });
    await user.save();
    return user;
  } catch (error) {
    logger.error(`Failed to create user: ` + error);
    console.error(`Failed to create user: `, error);
    throw new AppError(`Failed to create user: ${error}`, 500);
  }
};

export const LoginUserService = async (userData) => {
  try {
    const user = await IsUserExists(userData.email);
    if (!user) {
      throw new AppError(
        `Account With This Email ${userData.email} Not Exists. You Should Try To Login First`,
        404
      );
    }
    const isPasswordExists = await bcrypt.compare(
      userData.password,
      user?.password
    );
    if (!isPasswordExists) {
      throw new AppError(`Invalid Credentials`, 401);
    }
    const payload = { email: user.email, sub: String(user._id) };
    const token = await TokenGenerator(payload);
    return { token, user };
  } catch (error) {
    logger.error(`Failed to login user: ` + error);
    console.error(`Failed to login user: `, error);
    throw new AppError(`Failed to login user: ${error}`, 500);
  }
};

export const IsEmailTaken = async (email) => {
  try {
    const user = await UserModel.findOne({ email }).select("-password");
    return !!user;
  } catch (error) {
    logger.error(`Failed to find user with email:${email} ` + error);
    console.error(`Failed to find user with email:${email} `, error);
    throw new AppError(
      `Failed to find user with email:${email} and error is ${error}`,
      500
    );
  }
};

export const IsUserExists = async (email) => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    logger.error(`Failed to find user: ` + error);
    console.error(`Failed to find user: `, error);
    throw new AppError(`Failed to find user: ${error}`, 500);
  }
};
