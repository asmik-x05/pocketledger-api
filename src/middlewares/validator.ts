import { Request, Response, NextFunction } from "express";
import z, { ZodSchema, ZodError } from "zod";

const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const firstIssue = error.issues[0];
        const message = firstIssue?.message || "Validation failed";
        res.status(400).json({ message });
        return;
      }

      next(error);
    }
  };

export default validate;
