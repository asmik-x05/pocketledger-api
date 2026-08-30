import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { loginSchema, userSchema } from "../libs/schemas/user.js";
import validate from "../middlewares/validator.js";

const router: Router = Router();

router.post("/register", validate(userSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

export default router;
