import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: (value: string) => {
          const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
          return emailRegex.test(value);
        },
        message: "invalid Email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const model: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default model;