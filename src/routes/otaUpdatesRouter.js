import { Router } from "express";
import { isAuthorized } from "../middlewares/authMidleware.js";
import {
  createOtaUpdate,
  getOtaUpdates,
  getOtaUpdate,
} from "../controllers/otaUpdatesController.js";

const otaUpdatesRouter = Router();

otaUpdatesRouter.post("/", isAuthorized, createOtaUpdate);
otaUpdatesRouter.get("/", isAuthorized, getOtaUpdates);
otaUpdatesRouter.get("/:id", isAuthorized, getOtaUpdate);

export default otaUpdatesRouter;
