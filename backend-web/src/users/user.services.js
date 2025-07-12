import pool from "../database/db.js";

const getUserProfileService = async (userId) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT 
  u.user_id, 
  u.username, 
  u.ku_year, 
  u.contact, 
  u.email,
  u.role,
  u.faculty_id, 
  f.name AS faculty_name,
  u.major_id,
  m.name AS major_name
FROM users u
LEFT JOIN faculties f ON u.faculty_id = f.faculty_id
LEFT JOIN majors m ON u.major_id = m.major_id
WHERE u.user_id = $1;`,
      [userId]
    );
    if (result.rows.length === 0) {
      throw new Error("User not found");
    }
    return result.rows[0];
  } finally {
    client.release();
  }
};

const updateUserProfileService = async (
  userId,
  username,
  email,
  contact,
  ku_year,
  major_id,
  faculty_id,
  role
) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "UPDATE users SET username = $1, email = $2, contact = $3, ku_year = $4, major_id = $5, faculty_id = $6, role = $7 WHERE user_id = $8 RETURNING user_id, username, email, role",
      [username, email, contact, ku_year, major_id, faculty_id, role, userId]
    );
    if (result.rows.length === 0) {
      throw new Error("User not found");
    }
    return result.rows[0];
  } finally {
    client.release();
  }
};

export { getUserProfileService, updateUserProfileService };
