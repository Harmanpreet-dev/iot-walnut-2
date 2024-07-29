const { Router } = require("express");
const verifyToken = require("../middleware/authMidleware");
const {
  AddSchedule,
  getScheduleTask,
  getScheduleTaskDetails,
  textJob,
  StopJob,
} = require("../controller/scheduleController");
const logResponse = require("../middleware/logResponseMidleware");

const scheduleRouter = Router();

scheduleRouter.post("/addSchedule", verifyToken, AddSchedule);
scheduleRouter.get("/getScheduleTask", verifyToken, getScheduleTask);
scheduleRouter.post("/getScheduleTask", verifyToken, getScheduleTaskDetails);

scheduleRouter.post("/stopJob", verifyToken, StopJob);

scheduleRouter.get("/textJob", verifyToken, logResponse, textJob);

module.exports = scheduleRouter;
