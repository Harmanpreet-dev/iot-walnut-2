const { Router } = require("express");
const {
  addCategory,
  getCategory,
} = require("../controller/categoryController");
const verifyToken = require("../middleware/authMidleware");

const categoryRouter = Router();

categoryRouter.post("/categories", addCategory);
categoryRouter.get("/getCategories", verifyToken, getCategory);

module.exports = categoryRouter;
