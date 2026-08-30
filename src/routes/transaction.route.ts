import { Router } from "express";
import transactionController from "../controllers/transaction.controller.js";
import auth from "../middlewares/auth.js";
import {
  transactionSchema,
  updateTransactionSchema,
} from "../libs/schemas/transaction.js";
import validate from "../middlewares/validator.js";

const router: Router = Router();

router.post(
  "/",
  auth,
  validate(transactionSchema),
  transactionController.createTransaction,
);
router.get("/all", auth, transactionController.getAllTransactions);
router.get("/user/summary", auth, transactionController.getSummary);
router.get(
  "/category/:cat/summary",
  auth,
  transactionController.getCategorySummary,
);
router.get("/:id", auth, transactionController.getTransactionById);
router.put(
  "/:id",
  auth,
  validate(updateTransactionSchema),
  transactionController.updateTransaction,
);
router.delete("/:id", auth, transactionController.deleteTransaction);

export default router;
