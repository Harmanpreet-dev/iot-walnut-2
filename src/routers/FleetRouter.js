const { Router } = require("express");
const verifyToken = require("../middleware/authMidleware");
const { addFleet } = require("../controller/fleetController");

const fleetRouter = Router();

fleetRouter.post("/addFleet", verifyToken, addFleet);

module.exports = fleetRouter;
