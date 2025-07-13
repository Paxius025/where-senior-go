import pool from "../database/db.js";

const getAllPositionsInCompanyServices = async (companyId, limit, offset) => {
  try {
    const positionQuery = `
      SELECT
        c.name,
		pos.position_id,
        pos.title,
        pos.description,
        f.name AS field_name
      FROM positions pos
      LEFT JOIN fields f ON pos.field_id = f.field_id
	  LEFT JOIN companies c ON pos.company_id = c.company_id
      WHERE pos.company_id = $1
      LIMIT $2 OFFSET $3;
    `;

    const result = await pool.query(positionQuery, [companyId, limit, offset]);

    const countQuery = `SELECT COUNT(*) FROM positions WHERE company_id = $1;`;
    const countResult = await pool.query(countQuery, [companyId]);
    const total = parseInt(countResult.rows[0].count, 10);

    return {
      positions: result.rows,
      total,
    };
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
