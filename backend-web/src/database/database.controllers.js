import { healthCheck } from "./database.services.js";
export const healthCheckController = async (req, res, next) => {
    try {
        const result = await healthCheck();
        res.status(200).json({ message: "Database connection is healthy" });
    } catch (error) {
        console.error("Health check failed:", error);
        next(error);
    }
};
