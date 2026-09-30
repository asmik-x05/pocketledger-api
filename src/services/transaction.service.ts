import { Types } from "mongoose";
import Transaction, {
  ITransaction,
  TransactionType,
} from "../models/Transaction.js";
import Category from "../models/Category.js";

export interface CreateTransactionInput {
  categoryId: Types.ObjectId;
  type: TransactionType;
  amount: number;
  note?: string;
  date: Date;
}

export interface TransactionDTO {
  id: Types.ObjectId;
  userId: Types.ObjectId;
  categoryId: Types.ObjectId;
  type: TransactionType;
  amount: number;
  note?: string;
  date: Date;
}

export interface ServiceError {
  message: string;
  status: number;
}

export interface UpdateTransactionInput {
  categoryId?: Types.ObjectId;
  type?: TransactionType;
  amount?: number;
  note?: string;
  date?: Date;
}

const createTransaction = async (
  data: CreateTransactionInput,
  userId: Types.ObjectId,
): Promise<TransactionDTO> => {
  const { categoryId, type, amount, note, date } = data;

  const transaction: ITransaction = await Transaction.create({
    userId,
    categoryId,
    type,
    amount,
    note,
    date,
  });

  if (!transaction) {
    const error: ServiceError = {
      message: "Transaction creation failed",
      status: 500,
    };
    throw error;
  }

  return {
    id: transaction._id,
    userId: transaction.userId,
    categoryId: transaction.categoryId,
    type: transaction.type,
    amount: transaction.amount,
    note: transaction.note,
    date: transaction.date,
  };
};

const getAllTransactions = async (
  userId: Types.ObjectId,
): Promise<TransactionDTO[]> => {
  const transactions = await Transaction.find({ userId }).populate(
    "categoryId",
    "name",
  );
  return transactions.map((t) => ({
    id: t._id,
    userId: t.userId,
    categoryId: t.categoryId,
    type: t.type,
    amount: t.amount,
    note: t.note,
    date: t.date,
  }));
};
const getTransactionById = async (
  transactionId: string,
  userId: Types.ObjectId,
): Promise<TransactionDTO | null> => {
  const transaction = await Transaction.findOne({
    _id: transactionId,
    userId,
  }).populate("categoryId", "name");
  if (!transaction) {
    const error: ServiceError = {
      message: "Transaction not found",
      status: 404,
    };
    throw error;
  }
  return {
    id: transaction._id,
    userId: transaction.userId,
    categoryId: transaction.categoryId,
    type: transaction.type,
    amount: transaction.amount,
    note: transaction.note,
    date: transaction.date,
  };
};

const updateTransaction = async (
  transactionId: string,
  userId: Types.ObjectId,
  data: UpdateTransactionInput,
): Promise<TransactionDTO | null> => {
  const transaction = await Transaction.findOneAndUpdate(
    { _id: transactionId, userId },
    data,
    {
      new: true,
    },
  ).populate("categoryId", "name");
  if (!transaction) {
    const error: ServiceError = {
      message: "Transaction not found",
      status: 404,
    };
    throw error;
  }

  return {
    id: transaction._id,
    userId: transaction.userId,
    categoryId: transaction.categoryId,
    type: transaction.type,
    amount: transaction.amount,
    note: transaction.note,
    date: transaction.date,
  };
};
const deleteTransaction = async (
  transactionId: string,
  userId: Types.ObjectId,
): Promise<void> => {
  if (!Types.ObjectId.isValid(transactionId)) {
    const error: ServiceError = {
      message: "Invalid transaction ID",
      status: 400,
    };
    throw error;
  }
  const transaction = await Transaction.findByIdAndDelete(transactionId).where({
    userId,
  });

  if (!transaction) {
    const error: ServiceError = {
      message: "Transaction not found",
      status: 404,
    };
    throw error;
  }
  return;
};
const getSummary = async (
  userId: Types.ObjectId,
): Promise<{
  totalSavings: number;
  totalWithdrawals: number;
  balance: number;
}> => {
  const transactions = await Transaction.find({ userId });

  const totalSavings: number = transactions
    .filter((t) => t.type === "SAVING")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals: number = transactions
    .filter((t) => t.type === "WITHDRAWAL")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance: number = totalSavings - totalWithdrawals;

  return { totalSavings, totalWithdrawals, balance };
};

const getCategorySummary = async (
  userId: Types.ObjectId,
  category: string,
): Promise<{
  totalSavings: number;
  totalWithdrawals: number;
  balance: number;
}> => {
  const categoryData = await Category.findOne({ userId, name: category });
  if (!categoryData) {
    const error: ServiceError = {
      message: "Category not found",
      status: 404,
    };
    throw error;
  }

  const categoryId = categoryData._id;

  const transactions = await Transaction.find({ userId })
    .where("categoryId")
    .equals(categoryId);

  const totalSavings: number = transactions
    .filter((t) => t.type === "SAVING")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals: number = transactions
    .filter((t) => t.type === "WITHDRAWAL")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance: number = totalSavings - totalWithdrawals;

  return { totalSavings, totalWithdrawals, balance };
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
