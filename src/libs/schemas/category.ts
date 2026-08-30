import { z } from "zod";

const categorySchema = z.object({
  name: z.string({
    message: "Category name is required",
  }),

  target: z.number({
    message: "Target is required",
  }),
});

const updateCategorySchema = z.object({
  name: z.string().optional(),
  target: z.number().optional(),
});

export type CategorySchemaInput = z.infer<typeof categorySchema>;
export type UpdateCategorySchemaInput = z.infer<typeof updateCategorySchema>;

export { categorySchema, updateCategorySchema };