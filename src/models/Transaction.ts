import { Schema, model, Document, Types } from "mongoose";

export type TransactionType = "SAVING" | "WITHDRAWAL";

export interface ITransaction {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  categoryId: Types.ObjectId;
  type: TransactionType;
  amount: number;
  note?: string;
  date: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    categoryId: { type: Types.ObjectId, ref: "Category", required: true },
    type: { type: String, enum: ["SAVING", "WITHDRAWAL"], required: true },
    amount: { type: Number, required: true },
    note: { type: String },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);

export default model<ITransaction>("Transaction", transactionSchema);
