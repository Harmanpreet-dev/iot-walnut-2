const { Router } = require("express");
const { getLoggers } = require("../controller/loggerController");
const verifyToken = require("../middleware/authMidleware");

const loggerRouter = Router();
loggerRouter.get("/getLoggers", verifyToken, getLoggers);

module.exports = loggerRouter;
