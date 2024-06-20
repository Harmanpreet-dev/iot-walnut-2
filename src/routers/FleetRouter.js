const { Router } = require("express");
const verifyToken = require("../middleware/authMidleware");
const {
  addFleet,
  getFleet,
  getUserCategory,
} = require("../controller/fleetController");

const fleetRouter = Router();

fleetRouter.post("/addFleet", verifyToken, addFleet);
fleetRouter.get("/getFleets", verifyToken, getFleet);
fleetRouter.get("/getUserCategory", verifyToken, getUserCategory);

module.exports = fleetRouter;
