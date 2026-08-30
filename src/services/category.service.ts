import { Types } from "mongoose";
import Category, { ICategory } from "../models/Category.js";

export interface CreateCategoryInput {
  name: string;
  userId: Types.ObjectId;
  target: number;
}

export interface CategoryDTO {
  id: Types.ObjectId;
  name: string;
  userId: Types.ObjectId;
  target: number;
}

export interface ServiceError {
  message: string;
  status: number;
}

export interface UpdateCategoryInput {
  name?: string;
  target?: number;
}

const create = async (data: CreateCategoryInput): Promise<CategoryDTO> => {
  const { name, userId, target } = data;

  const existingCategory = await Category.findOne({
    name,
    userId,
  });

  if (existingCategory) {
    const error: ServiceError = {
      message: "Category already exists",
      status: 409,
    };
    throw error;
  }

  const category: ICategory = await Category.create({
    userId,
    name,
    target,
  });

  if (!category) {
    const error: ServiceError = {
      message: "Category creation failed",
      status: 500,
    };
    throw error;
  }

  return {
    id: category._id,
    name: category.name,
    userId: category.userId,
    target: category.target,
  };
};

const getAll = async (userId: Types.ObjectId): Promise<CategoryDTO[]> => {
  if (!userId) {
    const error: ServiceError = {
      message: "User ID is required",
      status: 400,
    };
    throw error;
  }

  const categories: ICategory[] = await Category.find({ userId });

  if (!categories) {
    const error: ServiceError = {
      message: "No categories found",
      status: 404,
    };
    throw error;
  }

  return categories.map((category) => ({
    id: category._id,
    name: category.name,
    userId: category.userId,
    target: category.target,
  }));
};

const getOne = async (
  id: string,
  userId: Types.ObjectId,
): Promise<CategoryDTO> => {
  if (!id || !userId) {
    const error: ServiceError = {
      message: "Category ID and User ID are required",
      status: 400,
    };
    throw error;
  }

  const isValidId = Types.ObjectId.isValid(id);
  if (!isValidId) {
    const error: ServiceError = {
      message: "Invalid category ID",
      status: 400,
    };
    throw error;
  }
  const category: ICategory | null = await Category.findById(id).where({
    userId,
  });

  if (!category) {
    const error: ServiceError = {
      message: "Category not found",
      status: 404,
    };
    throw error;
  }
  return {
    id: category._id,
    name: category.name,
    userId: category.userId,
    target: category.target,
  };
};

const update = async (
  id: string,
  userId: Types.ObjectId,
  data: UpdateCategoryInput,
): Promise<CategoryDTO> => {
  if (!id || !userId) {
    const error: ServiceError = {
      message: "Category ID and User ID are required",
      status: 400,
    };
    throw error;
  }

  const isValidId = Types.ObjectId.isValid(id);
  if (!isValidId) {
    const error: ServiceError = {
      message: "Invalid category ID",
      status: 400,
    };
    throw error;
  }

  const category: ICategory | null = await Category.findByIdAndUpdate(
    id,
    data,
    { new: true },
  ).where({ userId });

  if (!category) {
    const error: ServiceError = {
      message: "Category not found or update failed",
      status: 404,
    };
    throw error;
  }

  return {
    id: category._id,
    name: category.name,
    userId: category.userId,
    target: category.target,
  };
};

const remove = async (
  id: string,
  userId: Types.ObjectId,
): Promise<{ message: string }> => {
  if (!id || !userId) {
    const error: ServiceError = {
      message: "Category ID and User ID are required",
      status: 400,
    };
    throw error;
  }

  const isValidId = Types.ObjectId.isValid(id);
  if (!isValidId) {
    const error: ServiceError = {
      message: "Invalid category ID",
      status: 400,
    };
    throw error;
  }

  const category: ICategory | null = await Category.findByIdAndDelete(id).where(
    {
      userId,
    },
  );

  if (!category) {
    const error: ServiceError = {
      message: "Category not found or deletion failed",
      status: 404,
    };
    throw error;
  }

  return { message: "Category deleted successfully" };
};

export default { create, getAll, getOne, update, remove };
