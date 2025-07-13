import { getAllReviewsController, getReviewsByCompanyIdController, getReviewsByPositionIdController } from './review.controller.js';

import express from "express";
const reviewRouter = express.Router();

reviewRouter.get("/company", getReviewsByCompanyIdController);
reviewRouter.get("/position", getReviewsByPositionIdController);
reviewRouter.get("/", getAllReviewsController);

export default reviewRouter;