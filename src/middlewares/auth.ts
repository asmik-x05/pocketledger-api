import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyJWT } from "../utils/jwt.js";
import { UserDTO } from "../services/auth.service.js";

export interface AuthenticatedRequest extends Request {
  user?: UserDTO;
}

const auth: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;
  let token: string | undefined;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    const cookie = req.headers.cookie;
    if (!cookie) {
      res.status(401).send("User not authorized");
      return;
    }
    token = cookie.split("=")[1];
  }

  if (!token) {
    res.status(401).send("User not authorized");
    return;
  }

  try {
    const data = await verifyJWT(token);
    req.user = data;
    next();
  } catch (error) {
    res.status(401).send("invalid token");
    return;
  }
};

export default auth;
