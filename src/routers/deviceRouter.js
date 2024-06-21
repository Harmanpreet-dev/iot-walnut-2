const { Router } = require("express");
const verifyToken = require("../middleware/authMidleware");
const {
  addDevice,
  getDevices,
  addImei,
} = require("../controller/deviceController");
const multer = require("multer");

const deviceRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

deviceRouter.post("/addDevice", verifyToken, addDevice);
deviceRouter.get("/getDevices", verifyToken, getDevices);

deviceRouter.post("/upload", upload.single("file"), addImei);

module.exports = deviceRouter;
