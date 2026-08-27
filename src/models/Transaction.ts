import { Schema, model, Document } from "mongoose";

export type TransactionType = "SAVING" | "WITHDRAWAL";

export interface ITransaction extends Document {
  userId: Schema.Types.ObjectId;
  categoryId: Schema.Types.ObjectId;
  type: TransactionType;
  amount: number;
  note?: string;
  date: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    type: { type: String, enum: ["SAVING", "WITHDRAWAL"], required: true },
    amount: { type: Number, required: true },
    note: { type: String },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default model<ITransaction>("Transaction", transactionSchema);