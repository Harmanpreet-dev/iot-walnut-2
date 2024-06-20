const { Router } = require("express");
const verifyToken = require("../middleware/authMidleware");
const { addDevice, getDevices } = require("../controller/deviceController");

const deviceRouter = Router();

deviceRouter.post("/addDevice", verifyToken, addDevice);
deviceRouter.get("/getDevices", verifyToken, getDevices);

module.exports = deviceRouter;
