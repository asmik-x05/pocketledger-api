import { z } from "zod";

const userSchema = z.object({
  name: z.string({
    message: "Name is required",
  }),

  email: z
    .string({
      message: "Email is required",
    })
    .email("Invalid email address"),

  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .email("Invalid email address"),

  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export type RegisterSchemaInput = z.infer<typeof userSchema>;
export type LoginSchemaInput = z.infer<typeof loginSchema>;

export { userSchema, loginSchema };
