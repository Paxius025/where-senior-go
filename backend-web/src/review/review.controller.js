import  { getAllReviewsServices, getReviewsByCompanyIdServices, getReviewsByPositionIdServices } from './review.services.js';

const getAllReviewsController = async (req, res, next) => {
  try {
    const reviews = await getAllReviewsServices();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
}

const getReviewsByCompanyIdController = async (req, res, next) => {
  const { company_id } = req.body;
  try {
    const reviews = await getReviewsByCompanyIdServices(company_id);
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
}

const getReviewsByPositionIdController = async (req, res, next) => {
  const { position_id } = req.body;
  try {
    const reviews = await getReviewsByPositionIdServices(position_id);
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
}

export { getAllReviewsController, getReviewsByCompanyIdController, getReviewsByPositionIdController };
