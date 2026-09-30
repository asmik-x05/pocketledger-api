import { Request, Response } from "express";
import authService, {
  RegisterInput,
  LoginInput,
  UserDTO,
  ServiceError,
} from "../services/auth.service.js";
import { createJWT } from "../utils/jwt.js";

const register = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response,
): Promise<void> => {
  try {
    const user: UserDTO = await authService.register(req.body);

    const token: string = createJWT(user);
    res.cookie("authToken", token, { maxAge: 86400 * 1000, httpOnly: true });

    res.status(201).json({ ...user, token });
  } catch (error: any) {
    const status = (error as ServiceError).status || 400;
    res.status(status).json({ error: error?.message });
  }
};

const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
): Promise<void> => {
  try {
    const user: UserDTO = await authService.login(req.body);

    const token: string = createJWT(user);
    res.cookie("authToken", token, { maxAge: 86400 * 1000, httpOnly: true });

    res.status(200).json({ ...user, token });
  } catch (error: any) {
    const status = (error as ServiceError).status || 400;
    res.status(status).json({ error: error?.message });
  }
};
const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    await authService.forgotPassword(req.body.email);
    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error: any) {
    const status = (error as ServiceError).status || 400;
    res.status(status).json({ message: error?.message });
  }
};

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, password } = req.body;
    await authService.resetPassword(token, password);
    res.status(200).json({ message: "Password reset successful" });
  } catch (error: any) {
    const status = (error as ServiceError).status || 400;
    res.status(status).json({ message: error?.message });
  }
};

export default { register, login, forgotPassword, resetPassword };
