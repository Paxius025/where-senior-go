import pool from "../database/db.js";

const getAllCompaniesServices = async (limit, offset) => {
  try {
    const companyQuery = `
      SELECT
        c.company_id,
        c.name AS company_name,
        p.name AS province_name,
        l.link_url AS logo_url,
        c.created_at
      FROM companies c
      LEFT JOIN provinces p ON c.province_id = p.province_id
      LEFT JOIN logos l ON c.company_id = l.company_id
      ORDER BY c.name ASC
      LIMIT $1 OFFSET $2
    `;

    const countQuery = `SELECT COUNT(*) FROM companies`;

    const [dataResult, countResult] = await Promise.all([
      pool.query(companyQuery, [limit, offset]),
      pool.query(countQuery)
    ]);

    return {
      companies: dataResult.rows,
      total: parseInt(countResult.rows[0].count, 10)
    };
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};

const getTopFiveCompaniesServices = async () => {
  try {
    const result = await pool.query(`
          SELECT
    c.company_id,
    c.name AS company_name,
    p.name AS province_name,
    l.link_url AS logo_url,
    COUNT(r.review_id) AS review_count
FROM companies c
LEFT JOIN provinces p ON c.province_id = p.province_id
LEFT JOIN logos l ON c.company_id = l.company_id
LEFT JOIN positions pos ON pos.company_id = c.company_id
LEFT JOIN reviews r ON r.position_id = pos.position_id
GROUP BY c.company_id, c.name, p.name, l.link_url
ORDER BY review_count DESC
LIMIT 5; 
            `);
    return result.rows;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};


export { getAllCompaniesServices, getTopFiveCompaniesServices};