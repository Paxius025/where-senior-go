import pool from "../database/db.js";

const  getUserProfileService = async (userId) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT user_id, username, email FROM users WHERE user_id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      throw new Error("User not found");
    }
    return result.rows[0];
  } finally {
    client.release();
  }
}

const updateUserProfileService = async (userId, username, email, contact, ku_year, major_id, faculty_id  ) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
        "UPDATE users SET username = $1, email = $2, contact = $3, ku_year = $4, major_id = $5, faculty_id = $6 WHERE user_id = $7 RETURNING user_id, username, email",
        [username, email, contact, ku_year, major_id, faculty_id, userId]
        );
        if (result.rows.length === 0) {
        throw new Error("User not found");
        }
        return result.rows[0];
    } finally {
        client.release();
    }
}

export { getUserProfileService, updateUserProfileService };