import pool from "../database/db.js";

const getAllPositionsInCompanyServices = async (companyId) => {
  try {
    const result = await pool.query(
      `
            SELECT
            pos.position_id,
            pos.title,
            pos.description,
            f.name AS field_name
            FROM positions pos
            LEFT JOIN fields f ON pos.field_id = f.field_id
            WHERE pos.company_id = $1;
            `,
      [companyId]
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

const getAllPositions = async () => {
  try {
    const result = await pool.query(`
            SELECT
            pos.position_id,
            pos.title,
            pos.description,
            f.name AS field_name
            FROM positions pos
            LEFT JOIN fields f ON pos.field_id = f.field_id
            `);
    return result.rows;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export { getAllPositionsInCompanyServices, getAllPositions };
