import { Types } from "mongoose";
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
    const userId = new Types.ObjectId(req.user?.id as string);
    const transaction = await transactionService.createTransaction(
      req.body,
      userId,
    );
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
    const userId = new Types.ObjectId(req.user?.id as string);

    const transactions = await transactionService.getAllTransactions(userId);
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
    const userId = new Types.ObjectId(req.user?.id as string);
    const transactionId = req.params.id;
    if (typeof transactionId !== "string") {
      res.status(400).json({ message: "Invalid transaction ID" });
      return;
    }

    const transaction = await transactionService.getTransactionById(
      transactionId,
      userId,
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
    const userId = new Types.ObjectId(req.user?.id as string);
    const transaction = await transactionService.updateTransaction(
      transactionId,
      userId,
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
    const userId = new Types.ObjectId(req.user?.id as string);
    const transaction = await transactionService.deleteTransaction(
      transactionId,
      userId,
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
    const userId = new Types.ObjectId(req.user?.id as string);
    const summary = await transactionService.getSummary(userId);
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
    const userId = new Types.ObjectId(req.user?.id as string);
    const category = req.params.cat;
    if (typeof category !== "string") {
      res.status(400).json({ message: "Invalid category name" });
      return;
    }

    const summary = await transactionService.getCategorySummary(
      userId,
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
