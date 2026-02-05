import express from "express";

// Router Config
const UserRouter = express.Router();

// Imports
import {
  handleToCreateAccount,
  handleUserLogin,
  getUserProfile,
} from "../controller/user.controller.js";
import userValidator from "../validators/user.validator.js";
import ValidationHandler from "../validators/validatorHandler.js";
import authenticate from "../middleware/auth.js";

// Root Router
UserRouter.post(
  "/register",
  userValidator,
  ValidationHandler,
  handleToCreateAccount,
);
UserRouter.post("/login", handleUserLogin);

UserRouter.get("/get-user-profile", authenticate, getUserProfile);

export default UserRouter;
