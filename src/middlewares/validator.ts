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
        const formattedError = z.treeifyError(error);

        console.error(formattedError);
        res.status(400).json({ errors: formattedError });
        return;
      }

      next(error);
    }
  };

export default validate;