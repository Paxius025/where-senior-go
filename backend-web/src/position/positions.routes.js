import {
  getAllPositionsInCompanyController,
  getAllPositionsController,
} from "./positions.controller.js";
import { Router } from "express";

const positionsRouter = Router();

positionsRouter.get("/company", getAllPositionsInCompanyController);
positionsRouter.get("/", getAllPositionsController);

export default positionsRouter;
