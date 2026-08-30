import { z } from "zod";

const transactionSchema = z.object({
  categoryId: z.string({
    message: "Category is required",
  }),

  type: z.enum(["SAVING", "WITHDRAWAL"], {
    message: "Type must be SAVING or WITHDRAWAL",
  }),

  amount: z
    .number({ message: "Amount is required" })
    .positive("Amount must be greater than 0"),

  note: z.string().optional(),

  date: z.coerce.date({
    message: "Date is required",
  }),
});

const updateTransactionSchema = z.object({
  categoryId: z.string().optional(),
  type: z.enum(["SAVING", "WITHDRAWAL"]).optional(),
  amount: z.number().positive("Amount must be greater than 0").optional(),
  note: z.string().optional(),
  date: z.coerce.date().optional(),
});

export type TransactionSchemaInput = z.infer<typeof transactionSchema>;
export type UpdateTransactionSchemaInput = z.infer<
  typeof updateTransactionSchema
>;

export { transactionSchema, updateTransactionSchema };
