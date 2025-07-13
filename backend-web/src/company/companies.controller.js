import {
  getAllCompaniesServices,
  getTopFiveCompaniesServices,
  getLatestFiveCompaniesServices
} from "./companies.services.js";

const getAllCompaniesController = async (req, res, next) => {

  let offset = parseInt(req.query.offset, 10);
  let limit = parseInt(req.query.limit, 10);

  try {
    const { companies, total } = await getAllCompaniesServices(limit, offset);

    res.status(200).json({
      data: companies,
      displayingCount: companies.length,
      offset: offset,
      pageSize: limit,
      hasMore: offset + companies.length < total
    });
  } catch (error) {
    console.error("Error in getAllCompaniesController:", error);
    next(error);
  }
};

const getTopFiveCompaniesController = async (req, res, next) => {
  try {
    const topCompanies = await getTopFiveCompaniesServices();
    res.status(200).json(topCompanies);
  } catch (error) {
    console.error("Error in getTopFiveCompaniesController:", error);
    next(error);
  }
};

const getLatestFiveCompaniesController = async (req, res, next) => {
    try {
        const latestCompanies = await getLatestFiveCompaniesServices();
        res.status(200).json(latestCompanies);
    } catch (error) {
        console.error("Error in getLatestFiveCompaniesController:", error);
        next(error);
    }
};

export { getAllCompaniesController, getTopFiveCompaniesController, getLatestFiveCompaniesController };
