const { Router } = require("express");
const {
  addCategory,
  getCategory,
} = require("../controller/categoryController");
const verifyToken = require("../middleware/authMidleware");
const logResponse = require("../middleware/logResponseMidleware");

const categoryRouter = Router();

categoryRouter.post("/categories", verifyToken, logResponse, addCategory);
categoryRouter.get("/getCategories", verifyToken, getCategory);

module.exports = categoryRouter;
