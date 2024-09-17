import { Router } from "express";
import {
  addCategory,
  getCategories,
} from "../controllers/categoryController.js";
import { isAuthorized } from "../middlewares/authMidleware.js";
import logResponse from "../middlewares/logResponseMidleware.js";

const categoryRouter = Router();

categoryRouter.post("/", isAuthorized, logResponse, addCategory);
categoryRouter.get("/", isAuthorized, getCategories);

export default categoryRouter;
