import { Router } from "express";
import categoryController from "../controllers/category.controller.js";
import auth from "../middlewares/auth.js";
import validate from "../middlewares/validator.js";
import {
  categorySchema,
  updateCategorySchema,
} from "../libs/schemas/category.js";

const router: Router = Router();

router.post("/", auth, validate(categorySchema), categoryController.create);
router.get("/all", auth, categoryController.getAll);
router.get("/:id", auth, categoryController.getOne);
router.put(
  "/:id",
  auth,
  validate(updateCategorySchema),
  categoryController.update,
);
router.delete("/:id", auth, categoryController.remove);

export default router;
