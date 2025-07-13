import {
  getAllPositionsInCompanyServices,
  getAllPositions,
} from "./positions.services.js";

const getAllPositionsInCompanyController = async (req, res, next) => {
  const { company_id } = req.query;
  let offset = parseInt(req.query.offset, 10);
  let limit = parseInt(req.query.limit, 10);

  try {
    const positions = await getAllPositionsInCompanyServices(
      company_id,
      limit,
      offset
    );
    res.status(200).json(positions);
  } catch (error) {
    console.error("Error in getAllJobsInCompanyController:", error);
    next(error);
  }
};

const getAllPositionsController = async (req, res, next) => {
  try {
    const positions = await getAllPositions();
    res.status(200).json(positions);
  } catch (error) {
    console.error("Error in getAllPositionsController:", error);
    next(error);
  }
};

export { getAllPositionsInCompanyController, getAllPositionsController };
