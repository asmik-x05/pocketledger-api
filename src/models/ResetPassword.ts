import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IResetPassword extends Document {
  userId: Types.ObjectId;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  isUsed: boolean;
}

const resetPasswordSchema = new Schema<IResetPassword>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User Id is required."],
  },
  token: {
    type: String,
    required: [true, "Reset password token is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 3600000,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

const model: Model<IResetPassword> = mongoose.model<IResetPassword>(
  "ResetPassword",
  resetPasswordSchema,
);

export default model;
