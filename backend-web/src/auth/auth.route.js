import express from "express";
import { loginController, registerController, logoutController, checkSessionController } from "./auth.controller.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/check-session", checkSessionController);
router.post("/logout", logoutController);

export default router;