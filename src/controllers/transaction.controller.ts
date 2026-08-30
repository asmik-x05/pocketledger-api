import { AuthenticatedRequest } from "../middlewares/auth.js";
import transactionService, {
  ServiceError,
} from "../services/transaction.service.js";
import { Request, Response } from "express";

const createTransaction = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    req.body.userId = req.user?.id;
    const transaction = await transactionService.createTransaction(req.body);
    res.status(201).json(transaction);
  } catch (error: any) {
    const status = (error as ServiceError).status || 400;
    res.status(status).json({ error: error?.message });
  }
};

const getAllTransactions = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    req.body.userId = req.user?.id;
    const transactions = await transactionService.getAllTransactions(
      req.body.userId,
    );
    res.status(200).json(transactions);
  } catch (error: any) {
    const status = (error as ServiceError).status || 400;
    res.status(status).json({ error: error?.message });
  }
};

const getTransactionById = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    req.body.userId = req.user?.id;
    const transactionId = req.params.id;
    if (typeof transactionId !== "string") {
      res.status(400).json({ message: "Invalid transaction ID" });
      return;
    }

    const transaction = await transactionService.getTransactionById(
      transactionId,
      req.body.userId,
    );
    res.status(200).json(transaction);
  } catch (error: any) {
    const status = (error as ServiceError).status || 400;
    res.status(status).json({ error: error?.message });
  }
};

const updateTransaction = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const transactionId = req.params.id;
    if (typeof transactionId !== "string") {
      res.status(400).json({ message: "Invalid transaction ID" });
      return;
    }
    req.body.userId = req.user?.id;
    const transaction = await transactionService.updateTransaction(
      transactionId,
      req.body,
    );
    res.status(200).json(transaction);
  } catch (error: any) {
    const status = (error as ServiceError).status || 400;
    res.status(status).json({ error: error?.message });
  }
};

const deleteTransaction = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const transactionId = req.params.id;
    if (typeof transactionId !== "string") {
      res.status(400).json({ message: "Invalid transaction ID" });
      return;
    }
    req.body.userId = req.user?.id;
    const transaction = await transactionService.deleteTransaction(
      transactionId,
      req.body.userId,
    );
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error: any) {
    const status = (error as ServiceError).status || 400;
    res.status(status).json({ error: error?.message });
  }
};

const getSummary = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    req.body.userId = req.user?.id;
    const summary = await transactionService.getSummary(req.body.userId);
    res.status(200).json(summary);
  } catch (error: any) {
    const status = (error as ServiceError).status || 400;
    res.status(status).json({ error: error?.message });
  }
};

const getCategorySummary = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    req.body.userId = req.user?.id;
    const category = req.params.cat;
    if (typeof category !== "string") {
      res.status(400).json({ message: "Invalid category name" });
      return;
    }

    const summary = await transactionService.getCategorySummary(
      req.body.userId,
      category,
    );
    res.status(200).json(summary);
  } catch (error: any) {
    const status = (error as ServiceError).status || 400;
    res.status(status).json({ error: error?.message });
  }
};

export default {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
  getCategorySummary,
};
