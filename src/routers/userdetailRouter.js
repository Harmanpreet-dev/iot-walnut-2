const { Router } = require("express");
const verifyToken = require("../middleware/authMidleware");
const {
  adduserdetail,
  getuserdetail,
  updateuserdetail,
} = require("../controller/userdetailController");
const logResponse = require("../middleware/logResponseMidleware");

const userdetailRouter = Router();

userdetailRouter.get("/getuserdetail", verifyToken, getuserdetail);
userdetailRouter.post(
  "/adduserdetail",
  verifyToken,
  logResponse,
  adduserdetail
);
userdetailRouter.post(
  "/updateuserdetail",
  verifyToken,
  logResponse,
  updateuserdetail
);

module.exports = userdetailRouter;
