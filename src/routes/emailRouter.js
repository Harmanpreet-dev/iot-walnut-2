import { Router } from "express";
import {
  isEmailExists,
  updateEmail,
  verifyUpdateEmailOtp,
  sendOTP,
  verifyOTP,
} from "../controllers/emailController.js";
import { isAuthorized } from "../middlewares/authMidleware.js";

const emailRouter = Router();

emailRouter.post("/exists", isAuthorized, isEmailExists);
emailRouter.put("/update", isAuthorized, updateEmail);
emailRouter.put("/update/verify-otp", isAuthorized, verifyUpdateEmailOtp);
emailRouter.post("/otp", isAuthorized, sendOTP);
emailRouter.post("/verify-otp", isAuthorized, verifyOTP);

export default emailRouter;
