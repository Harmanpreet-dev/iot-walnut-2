import { Router } from "express";
import {
  loginUser,
  logoutUser,
  changePassword,
  generateToken,
} from "../controllers/authController.js";
import { isAuthorized } from "../middlewares/authMidleware.js";

const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.post("/logout", isAuthorized, logoutUser);
authRouter.post("/change-password", isAuthorized, changePassword);
authRouter.get("/generate-token", generateToken);

export default authRouter;
