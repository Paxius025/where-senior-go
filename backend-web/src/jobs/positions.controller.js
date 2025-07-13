import { getAllPositionsInCompanyServices, getAllPositions } from "./positions.services.js";

const getAllPositionsInCompanyController = async (req, res, next) => {
    const { companyId } = req.body;
    try {
        const positions = await getAllPositionsInCompanyServices(companyId);
        res.status(200).json(positions);
    } catch (error) {
        console.error("Error in getAllJobsInCompanyController:", error);
        next(error);
    }
}

const getAllPositionsController = async (req, res, next) => {
    try {
        const positions = await getAllPositions();
        res.status(200).json(positions);
    } catch (error) {
        console.error("Error in getAllPositionsController:", error);
        next(error);
    }
}

export { getAllPositionsInCompanyController, getAllPositionsController };