const { Router } = require("express");
const verifyToken = require("../middleware/authMidleware");
const {
  vertifyTokenStatus,
  updateProfile,
  sendEmailOTP,
  verifyEmailOTP,
  generateGoogleOTP,
  verifyGoogleOTP,
} = require("../controller/commonController");

const commonRouter = Router();

commonRouter.get("/verifyTokenStatus", verifyToken, vertifyTokenStatus);
commonRouter.post("/updateProfile", verifyToken, updateProfile);

// 2FA
commonRouter.get("/sendEmailOTP", verifyToken, sendEmailOTP);
commonRouter.post("/verifyEmailOTP", verifyToken, verifyEmailOTP);
commonRouter.post("/generateGoogleOTP", verifyToken, generateGoogleOTP);
commonRouter.post("/verifyGoogleOTP", verifyToken, verifyGoogleOTP);

module.exports = commonRouter;
