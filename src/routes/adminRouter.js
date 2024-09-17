import { Router } from "express";
import {
  getAdmins,
  addAdmin,
  deleteAdmin,
  updateAdmin,
  getAdmin,
} from "../controllers/adminsController.js";
import { isSuperAdmin } from "../middlewares/authMidleware.js";
import logResponse from "../middlewares/logResponseMidleware.js";

const adminRouter = Router();

adminRouter.post("/", isSuperAdmin, logResponse, addAdmin);
adminRouter.get("/", isSuperAdmin, getAdmins);
adminRouter.get("/:id", getAdmin);
adminRouter.put("/:id", isSuperAdmin, logResponse, updateAdmin);
adminRouter.delete("/:id", isSuperAdmin, logResponse, deleteAdmin);

export default adminRouter;
