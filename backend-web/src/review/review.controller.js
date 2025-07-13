import {
  getAllReviewsServices,
  getReviewsByCompanyAndPositionIdServices,
} from "./review.services.js";

const getAllReviewsController = async (req, res, next) => {
  try {
    const reviews = await getAllReviewsServices();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

const getReviewsByCompanyAndPositionIdController = async (req, res, next) => {
  const { company_id, position_id } = req.query;
  try {
    const reviews = await getReviewsByCompanyAndPositionIdServices(
      company_id,
      position_id
    );
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export { getAllReviewsController, getReviewsByCompanyAndPositionIdController };
