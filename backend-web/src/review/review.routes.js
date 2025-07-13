import { getAllReviewsController, getReviewsByCompanyAndPositionIdController } from './review.controller.js';

import express from "express";
const reviewRouter = express.Router();


reviewRouter.get("/", getAllReviewsController);
reviewRouter.get("/by-company-and-position", getReviewsByCompanyAndPositionIdController);

export default reviewRouter;