const { Router } = require("express");
const verifyToken = require("../middleware/authMidleware");
const {
  AddSchedule,
  getScheduleTask,
  getScheduleTaskDetails,
} = require("../controller/scheduleController");

const scheduleRouter = Router();

scheduleRouter.post("/addSchedule", verifyToken, AddSchedule);
scheduleRouter.get("/getScheduleTask", verifyToken, getScheduleTask);
scheduleRouter.post("/getScheduleTask", verifyToken, getScheduleTaskDetails);

module.exports = scheduleRouter;
