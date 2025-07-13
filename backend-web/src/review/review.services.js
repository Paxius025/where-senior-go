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

    if (options.companyId) {
      whereClause = ' WHERE c.company_id = $1';
      params.push(options.companyId);
    } else if (options.positionId) {
      whereClause = ' WHERE r.position_id = $1';
      params.push(options.positionId);
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

// get review by Company ID
const getReviewsByCompanyIdServices = async (companyId) => {
  if (!companyId) {
    throw new Error("Company ID is required.");
  }
  return getReviews({ companyId });
};

// get review by Position ID
const getReviewsByPositionIdServices = async (positionId) => {
  if (!positionId) {
    throw new Error("Position ID is required.");
  }
  return getReviews({ positionId });
};

export {
  getAllReviewsServices,
  getReviewsByCompanyIdServices,
  getReviewsByPositionIdServices,
};
