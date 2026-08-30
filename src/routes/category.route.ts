import { Router } from "express";
import categoryController from "../controllers/category.controller.js";
import auth from "../middlewares/auth.js";

const router: Router = Router();

router.post("/", auth, categoryController.create);
router.get("/all", auth, categoryController.getAll);
router.get("/:id", auth, categoryController.getOne);
router.put("/:id", auth, categoryController.update);
router.delete("/:id", auth, categoryController.remove);

export default router;
