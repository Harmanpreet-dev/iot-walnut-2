import { Router } from "express";
import { isAuthorized } from "../middlewares/authMidleware.js";
import {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";
import logResponse from "../middlewares/logResponseMidleware.js";

const usersRouter = Router();

usersRouter.post("/", isAuthorized, addUser);
usersRouter.get("/", isAuthorized, getUsers);
usersRouter.get("/:id", isAuthorized, getUser);
usersRouter.put("/:id", isAuthorized, logResponse, updateUser);
usersRouter.delete("/:id", isAuthorized, logResponse, deleteUser);

export default usersRouter;
