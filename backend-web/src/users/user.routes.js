import express from "express";
import { getUserProfileController, updateUserProfileController } from "./user.controllers.js";

const usersProfileRouter = express.Router();

usersProfileRouter.get("/profile/me", getUserProfileController);
usersProfileRouter.put("/profile/me", updateUserProfileController);

export default usersProfileRouter;
