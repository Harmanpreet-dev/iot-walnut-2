import { Router } from "express";
import {
  generateGoogleOTP,
  verifyGoogleOTP,
} from "../controllers/googleController.js";
import { isAuthorized } from "../middlewares/authMidleware.js";

const googleRouter = Router();

googleRouter.post("/otp", isAuthorized, generateGoogleOTP);
googleRouter.post("/verify-otp", isAuthorized, verifyGoogleOTP);

export default googleRouter;
