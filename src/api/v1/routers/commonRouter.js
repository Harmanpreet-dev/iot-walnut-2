const { Router } = require("express");
const verifyToken = require("../middleware/authMidleware");
const {
  vertifyTokenStatus,
  updateProfile,
  sendEmailOTP,
  verifyEmailOTP,
  generateGoogleOTP,
  verifyGoogleOTP,
  demo,
  changePassword,
} = require("../controller/commonController");

const commonRouter = Router();

commonRouter.get("/verifyTokenStatus", verifyToken, vertifyTokenStatus);
commonRouter.post("/updateProfile", verifyToken, updateProfile);
commonRouter.post("/changePassword", verifyToken, changePassword);
commonRouter.get("/demo", demo);

// 2FA
commonRouter.post("/sendEmailOTP", verifyToken, sendEmailOTP);
commonRouter.post("/verifyEmailOTP", verifyToken, verifyEmailOTP);
commonRouter.post("/generateGoogleOTP", verifyToken, generateGoogleOTP);
commonRouter.post("/verifyGoogleOTP", verifyToken, verifyGoogleOTP);

module.exports = commonRouter;
