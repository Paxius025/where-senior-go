import pool from "./db.js";

export const healthCheck = async () => {
  let client;
  try {
    client = await pool.connect();
    console.log("Connected to the database successfully");
    return {
      message: "Database connection is healthy",
    };
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
};
