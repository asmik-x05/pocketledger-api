import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User.js";
import config from "../config/config.js";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ServiceError {
  message: string;
  status: number;
}

export interface UserDTO {
  id: unknown;
  name: string;
  email: string;
  isActive: boolean;
}

const register = async (data: RegisterInput): Promise<UserDTO> => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error: ServiceError = {
      message: "User already exists",
      status: 409,
    };
    throw error;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user: IUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    const error: ServiceError = {
      message: "User registration failed",
      status: 500,
    };
    throw error;
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    isActive: user.isActive,
  };
};

const login = async (data: LoginInput): Promise<UserDTO> => {
  const user = await User.findOne({ email: data.email });

  if (!user) {
    const error: ServiceError = {
      message: "Invalid credentials",
      status: 401,
    };
    throw error;
  }

  if (!user.isActive) {
    const error: ServiceError = {
      message: "User account is deactivated",
      status: 403,
    };
    throw error;
  }

  const isPasswordMatch = bcrypt.compareSync(data.password, user.password);
  if (!isPasswordMatch) {
    const error: ServiceError = {
      status: 400,
      message: "Incorrect email or password",
    };
    throw error;
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    isActive: user.isActive,
  };
};

import crypto from "crypto";
import ResetPassword from "../models/ResetPassword.js";
import { sendResetEmail } from "../utils/sendEmail.js";

const forgotPassword = async (email: string): Promise<void> => {
  const user = await User.findOne({ email });
  if (!user) {
    const error: ServiceError = {
      message: "No account found with this email",
      status: 404,
    };
    throw error;
  }

  const token = crypto.randomBytes(32).toString("hex");

  await ResetPassword.create({
    userId: user._id,
    token,
  });

  const resetLink = `${config.app_url}/reset-password?token=${token}`;
  await sendResetEmail(user.email, user.name, resetLink);
};

const resetPassword = async (
  token: string,
  newPassword: string,
): Promise<void> => {
  const record = await ResetPassword.findOne({ token, isUsed: false });

  if (!record) {
    const error: ServiceError = {
      message: "Invalid or expired token",
      status: 400,
    };
    throw error;
  }

  if (record.expiresAt < new Date()) {
    const error: ServiceError = { message: "Token has expired", status: 400 };
    throw error;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(record.userId, { password: hashedPassword });

  record.isUsed = true;
  await record.save();
};

export default { register, login, forgotPassword, resetPassword };
