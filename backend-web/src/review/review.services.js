import pool from "../database/db.js";

// Main function + Optional query
const getReviews = async (options = {}) => {
  try {
    let query = `
      SELECT
        r.review_id,
        r.rating,
        r.summary,
        r.detail,
        r.strength,
        r.advice,
        u.username,
        p.title AS position_title, 
        c.name AS company_name
      FROM reviews r
      JOIN users u ON r.user_id = u.user_id
      JOIN positions p ON r.position_id = p.position_id
      JOIN companies c ON p.company_id = c.company_id
    `;
    const params = [];
    let whereClause = '';

    if (options.positionId && options.companyId) {
      whereClause = ' WHERE r.position_id = $1 AND c.company_id = $2';
      params.push(options.positionId, options.companyId);
    }

    query += whereClause + ' ORDER BY r.rating DESC;';

    const result = await pool.query(query, params);

    return result.rows;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

const getAllReviewsServices = async () => {
  return getReviews();
};

// get review by Company ID and Position ID : For company page
// This is used to fetch reviews for a specific company and position
const getReviewsByCompanyAndPositionIdServices = async (companyId, positionId) => {
  if (!companyId || !positionId) {
    throw new Error("Both Company ID and Position ID are required.");
  }
  return getReviews({ companyId, positionId });
};

export {
  getAllReviewsServices,
  getReviewsByCompanyAndPositionIdServices
};
