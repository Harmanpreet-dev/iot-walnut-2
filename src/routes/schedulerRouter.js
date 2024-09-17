import { Router } from "express";
import { isAuthorized } from "../middlewares/authMidleware.js";
import {
  addScheduler,
  getSchedulers,
  getScheduler,
  stopJob,
} from "../controllers/schedulerController.js";

const schedulerRouter = Router();

schedulerRouter.post("/", isAuthorized, addScheduler);
schedulerRouter.get("/", isAuthorized, getSchedulers);
schedulerRouter.get("/:id", isAuthorized, getScheduler);
schedulerRouter.post("/stop-job", isAuthorized, stopJob);

export default schedulerRouter;
