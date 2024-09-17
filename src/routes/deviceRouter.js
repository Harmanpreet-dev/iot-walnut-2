import { Router } from "express";
import multer from "multer";
import { isAuthorized } from "../middlewares/authMidleware.js";
import {
  addDevice,
  getDevices,
  getDeviceByName,
  revokeDevice,
  getFleetDevices,
  getCertificate,
  addImeiToWhitelist,
  addImeiToBlacklist,
} from "./../controllers/deviceController.js";
import logResponse from "./../middlewares/logResponseMidleware.js";

const deviceRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

deviceRouter.post("/", isAuthorized, logResponse, addDevice);
deviceRouter.get("/", isAuthorized, getDevices);
deviceRouter.get("/fleet/:fleet", isAuthorized, getFleetDevices);
deviceRouter.post("/revoke/:certificateId", isAuthorized, revokeDevice);
deviceRouter.post("/certificates/:imei", isAuthorized, getCertificate);
deviceRouter.post(
  "/whitelist",
  upload.single("file"),
  logResponse,
  addImeiToWhitelist
);
deviceRouter.post(
  "/blacklist",
  upload.single("file"),
  logResponse,
  addImeiToBlacklist
);
deviceRouter.post("/:name", isAuthorized, getDeviceByName);

export default deviceRouter;
