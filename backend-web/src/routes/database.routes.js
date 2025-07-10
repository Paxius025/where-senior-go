import express from "express";
import { healthCheckController } from "../controller/database.controllers.js";

const router = express.Router();

router.get("/health", healthCheckController);

export default router;
