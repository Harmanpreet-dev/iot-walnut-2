import { Router } from "express";
import { isAuthorized } from "../middlewares/authMidleware.js";
import { getLogs } from "../controllers/logsController.js";

const loggerRouter = Router();
loggerRouter.get("/logs", isAuthorized, getLogs);

export default loggerRouter;
