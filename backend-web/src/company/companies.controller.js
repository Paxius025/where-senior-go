import { getCompaniesServices, getTopFiveCompaniesServices } from "./companies.services.js";

const getCompaniesController = async (req, res, next) => {
    try {
        const companies = await getCompaniesServices();
        res.status(200).json(companies);
    } catch (error) {
        console.error("Error in getCompaniesController:", error);
        next(error);
    }
}

const getTopFiveCompaniesController = async (req, res, next) => {
    try {
        const topCompanies = await getTopFiveCompaniesServices();
        res.status(200).json(topCompanies);
    } catch (error) {
        console.error("Error in getTopFiveCompaniesController:", error);
        next(error);
    }
}

export { getCompaniesController, getTopFiveCompaniesController };

