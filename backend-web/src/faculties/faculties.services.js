import pool from "../database/db.js"

const getAllFacultiesServices = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM faculties");
    return result.rows;
  } finally {
    client.release();
  }
}

const getMajorsFromFacultyIdServices = async (facultyId) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT m.* 
       FROM  majors m
       JOIN faculties f ON f.faculty_id = m.faculty_id
       WHERE f.faculty_id = $1`,
      [facultyId]
    );

    if (result.rows.length === 0) {
      throw new Error("Major not found");
    }

    return result.rows;
  } finally {
    client.release();
  }
};

export { getAllFacultiesServices, getMajorsFromFacultyIdServices };
