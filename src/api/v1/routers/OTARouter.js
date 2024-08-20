const { Router } = require("express");
const verifyToken = require("../middleware/authMidleware");
const {
  createOTAUpdate,
  getOTAUpdates,
  getOTAUpdateDetails,
  textJob,
} = require("../controller/OTAController");

const OTARouter = Router();

OTARouter.post("/", verifyToken, createOTAUpdate);
OTARouter.get("/", verifyToken, getOTAUpdates);
OTARouter.get("/:id", verifyToken, getOTAUpdateDetails);

OTARouter.get("/textJob", verifyToken, textJob);

module.exports = OTARouter;
