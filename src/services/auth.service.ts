import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User.js"; // Adjust import path to your Mongoose model

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

export default { register, login };