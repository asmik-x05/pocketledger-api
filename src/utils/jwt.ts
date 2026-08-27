import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import config from "../config/config.js";
import { UserDTO } from "../services/auth.service.js"; 

export interface CustomJwtPayload extends UserDTO, JwtPayload {}

const createJWT = (data: UserDTO): string => {
  const secret: Secret = config.jwt_secret;

  const token = jwt.sign(data, secret, {
    expiresIn: "2d",
  });

  return token;
};

const verifyJWT = <T = CustomJwtPayload>(token: string): Promise<T> => {
  const secret: Secret = config.jwt_secret;

  return new Promise<T>((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) return reject(error);
      resolve(decoded as T);
    });
  });
};

export { createJWT, verifyJWT };