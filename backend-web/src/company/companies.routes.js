import { getCompaniesController, getTopFiveCompaniesController } from "./companies.controller.js";
import { Router } from "express";

const companiesRouter = Router();

companiesRouter.get("/top-five", getTopFiveCompaniesController);
companiesRouter.get("/", getCompaniesController);

export default companiesRouter;

