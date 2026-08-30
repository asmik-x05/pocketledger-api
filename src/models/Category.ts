import { Schema, Types, model } from "mongoose";

export interface ICategory {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  name: string;
  target: number;
}

const categorySchema = new Schema<ICategory>(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    target: { type: Number, required: true },
  },
  { timestamps: true },
);

export default model<ICategory>("Category", categorySchema);
