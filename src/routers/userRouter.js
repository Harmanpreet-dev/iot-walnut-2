const { Router } = require("express");
const {
  getAdmins,
  addAdmin,
  deleteAdmin,
  updateUsers,
  loginUser,
  logoutUser,
  getSingleAdmins,
  checkEmail,
} = require("../controller/usersController");
const verifyToken = require("../middleware/authMidleware");

const userRouter = Router();

userRouter.post("/loginUser", loginUser);
userRouter.post("/logoutUser", logoutUser);

userRouter.get("/getAdmins", verifyToken, getAdmins);
userRouter.post("/addAdmin", verifyToken, addAdmin);
userRouter.post("/deleteAdmin", verifyToken, deleteAdmin);
userRouter.post("/updateUser", updateUsers);
userRouter.post("/getSingleAdmin", getSingleAdmins);
userRouter.post("/checkEmail", checkEmail);

module.exports = userRouter;
