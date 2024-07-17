const { Router } = require("express");
const verifyToken = require("../middleware/authMidleware");
const {
  adduserdetail,
  getuserdetail,
  updateuserdetail,
} = require("../controller/userdetailController");

const userdetailRouter = Router();

userdetailRouter.get("/getuserdetail", verifyToken, getuserdetail);
userdetailRouter.post("/adduserdetail", verifyToken, adduserdetail);
userdetailRouter.post("/updateuserdetail", updateuserdetail);

module.exports = userdetailRouter;
