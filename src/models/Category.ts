import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  userId: Schema.Types.ObjectId;
  name: string;
  type?: "SAVING" | "WITHDRAWAL";
}

const categorySchema = new Schema<ICategory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["SAVING", "WITHDRAWAL"] },
  },
  { timestamps: true }
);

export default model<ICategory>("Category", categorySchema);