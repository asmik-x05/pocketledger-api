import { Types } from "mongoose";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import categoryService, { ServiceError } from "../services/category.service.js";
import { Request, Response } from "express";

const create = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = new Types.ObjectId(req.user?.id as string);

    const category = await categoryService.create(req.body, userId);
    res.status(201).json(category);
  } catch (error: any) {
    const status = (error as ServiceError).status || 400;
    res.status(status).json({ error: error?.message });
  }
};

const getAll = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = new Types.ObjectId(req.user?.id as string);

    const categories = await categoryService.getAll(userId);
    res.status(200).json(categories);
  } catch (error: any) {
    const status = (error as ServiceError).status || 400;
    res.status(status).json({ error: error?.message });
  }
};
const getOne = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = new Types.ObjectId(req.user?.id as string);
    const categoryId = req.params.id;
    if (typeof categoryId !== "string") {
      res.status(400).json({ message: "Invalid category ID" });
      return;
    }

    const category = await categoryService.getOne(categoryId, userId);
    res.status(200).json(category);
  } catch (error: any) {
    const status = (error as ServiceError).status || 400;
    res.status(status).json({ error: error?.message });
  }
};

const update = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = new Types.ObjectId(req.user?.id as string);
    const categoryId = req.params.id;
    if (typeof categoryId !== "string") {
      res.status(400).json({ message: "Invalid category ID" });
      return;
    }

    const category = await categoryService.update(categoryId, userId, req.body);
    res.status(200).json(category);
  } catch (error: any) {
    const status = (error as ServiceError).status || 400;
    res.status(status).json({ error: error?.message });
  }
};

const remove = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = new Types.ObjectId(req.user?.id as string);
    const categoryId = req.params.id;
    if (typeof categoryId !== "string") {
      res.status(400).json({ message: "Invalid category ID" });
      return;
    }

    const msg = await categoryService.remove(categoryId, userId);
    res.status(200).json(msg);
  } catch (error: any) {
    const status = (error as ServiceError).status || 400;
    res.status(status).json({ error: error?.message });
  }
};

export default {
  create,
  getAll,
  getOne,
  update,
  remove,
};
