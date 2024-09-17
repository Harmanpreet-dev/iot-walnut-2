import { Router } from "express";
import { isAuthorized } from "../middlewares/authMidleware.js";
import {
  addFleet,
  getFleets,
  getUsersAndCategories,
  getFleetsByAdmin,
} from "../controllers/fleetController.js";
import logResponse from "../middlewares/logResponseMidleware.js";

const fleetRouter = Router();

fleetRouter.post("/", isAuthorized, logResponse, addFleet);
fleetRouter.get("/", isAuthorized, getFleets);
fleetRouter.get("/users-categories", isAuthorized, getUsersAndCategories);
fleetRouter.get("/:id", isAuthorized, getFleetsByAdmin);

export default fleetRouter;
