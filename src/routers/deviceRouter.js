const { Router } = require("express");
const verifyToken = require("../middleware/authMidleware");
const {
  addDevice,
  getDevices,
  addImei,
  getDevice,
  addBlackImei,
  revokeDevice,
  getDevicesAll,
} = require("../controller/deviceController");
const multer = require("multer");
const logResponse = require("../middleware/logResponseMidleware");

const deviceRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

deviceRouter.post("/addDevice", verifyToken, logResponse, addDevice);
deviceRouter.get("/getDevices", verifyToken, getDevicesAll);
deviceRouter.post("/getDevices", verifyToken, getDevices);
deviceRouter.post("/getDevice", verifyToken, getDevice);
deviceRouter.post("/revokeDevice", verifyToken, revokeDevice);
deviceRouter.post("/upload", upload.single("file"), logResponse, addImei);
deviceRouter.post(
  "/uploadBlack",
  upload.single("file"),
  logResponse,
  addBlackImei
);

module.exports = deviceRouter;
