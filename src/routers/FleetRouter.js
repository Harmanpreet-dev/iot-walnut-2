const { Router } = require("express");
const verifyToken = require("../middleware/authMidleware");
const {
  addFleet,
  getFleet,
  getUserCategory,
  getFleetByAdmin,
} = require("../controller/fleetController");
const logResponse = require("../middleware/logResponseMidleware");

const fleetRouter = Router();

fleetRouter.post("/addFleet", verifyToken, logResponse, addFleet);
fleetRouter.get("/getFleets", verifyToken, getFleet);
fleetRouter.post("/getFleet", verifyToken, getFleetByAdmin);
fleetRouter.get("/getUserCategory", verifyToken, getUserCategory);

module.exports = fleetRouter;
