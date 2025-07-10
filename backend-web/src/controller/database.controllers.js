import { healthCheck } from "../services/database.services.js";
export const healthCheckController = async (req, res) => {
    try {
        const result = await healthCheck();
        res.status(200).json({ message: "Database connection is healthy" });
    } catch (error) {
        console.error("Health check failed:", error);
        res.status(500).json({ error: "Database connection is not healthy" });
    }
};
