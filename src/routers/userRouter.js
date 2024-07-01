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

const userRouter = Router();

userRouter.post("/loginUser", loginUser);
userRouter.post("/logoutUser", logoutUser);

userRouter.get("/getAdmins", verifyToken, getAdmins);
userRouter.post("/addAdmin", verifyToken, addAdmin);
userRouter.post("/deleteAdmin", verifyToken, deleteAdmin);
userRouter.post("/updateAdmin", updateAdmin);
userRouter.post("/getSingleAdmin", getSingleAdmins);
userRouter.post("/checkEmail", checkEmail);
userRouter.post("/checkEmailEdit", checkEmailEdit);

module.exports = userRouter;
