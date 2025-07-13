import {
  getTopFiveCompaniesController,
  getAllCompaniesController,
    getLatestFiveCompaniesController
} from "./companies.controller.js";
import { Router } from "express";

const companiesRouter = Router();

companiesRouter.get("/top-five", getTopFiveCompaniesController);
companiesRouter.get("/latest", getLatestFiveCompaniesController);
companiesRouter.get("/", getAllCompaniesController);

export default companiesRouter;
