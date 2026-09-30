import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { loginSchema, userSchema } from "../libs/schemas/user.js";
import validate from "../middlewares/validator.js";

const router: Router = Router();

router.post("/register", validate(userSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

export default router;
