import { AuthenticatedRequest } from "../middlewares/auth.js";
import categoryService, {  
  ServiceError,
} from "../services/category.service.js";
import { Request, Response } from "express";

const create = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    req.body.userId = req.user?.id;

    const category = await categoryService.create(req.body);
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
    req.body.userId = req.user?.id;

    const categories = await categoryService.getAll(req.body.userId);
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
    req.body.userId = req.user?.id;
    req.body.categoryId = req.params.id;

    const category = await categoryService.getOne(
      req.body.categoryId,
      req.body.userId,
    );
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
    req.body.userId = req.user?.id;
    req.body.categoryId = req.params.id;

    const category = await categoryService.update(
      req.body.categoryId,
      req.body.userId,
      req.body,
    );
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
    req.body.userId = req.user?.id;
    req.body.categoryId = req.params.id;

    const msg = await categoryService.remove(
      req.body.categoryId,
      req.body.userId,
    );
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
