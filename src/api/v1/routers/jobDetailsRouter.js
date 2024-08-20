const { Router } = require("express");
const verifyToken = require("../middleware/authMidleware");
const { getJobDetails } = require("../controller/getJobDetails");

const jobDetailsRouter = Router();
jobDetailsRouter.post("/getJobDetails", verifyToken, getJobDetails);

module.exports = jobDetailsRouter;
