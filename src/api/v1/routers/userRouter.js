const { Router } = require("express");
const {
  getAdmins,
  addAdmin,
  deleteAdmin,
  updateAdmin,
  loginUser,
  logoutUser,
  getSingleAdmins,
  checkEmail,
  checkEmailEdit,
} = require("../controller/usersController");
const verifyToken = require("../middleware/authMidleware");
const logResponse = require("../middleware/logResponseMidleware");

const userRouter = Router();

userRouter.post("/loginUser", loginUser);
userRouter.post("/logoutUser", logoutUser);

userRouter.get("/getAdmins", verifyToken, getAdmins);
userRouter.post("/addAdmin", verifyToken, logResponse, addAdmin);
userRouter.post("/deleteAdmin", verifyToken, logResponse, deleteAdmin);
userRouter.post("/updateAdmin", verifyToken, logResponse, updateAdmin);
userRouter.post("/getSingleAdmin", getSingleAdmins);
userRouter.post("/checkEmail", checkEmail);
userRouter.post("/checkEmailEdit", checkEmailEdit);

module.exports = userRouter;
