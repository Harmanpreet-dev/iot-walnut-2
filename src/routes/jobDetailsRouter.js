import { Router } from "express";
import { isAuthorized } from "../middlewares/authMidleware.js";
import { jobDetails } from "./../controllers/jobDetails.js";

const jobDetailsRouter = Router();
jobDetailsRouter.post("/", isAuthorized, jobDetails);

export default jobDetailsRouter;
