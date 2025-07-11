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

const getFacultyByIdServices = async (facultyId) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM faculties WHERE faculty_id = $1", [facultyId]);
    if (result.rows.length === 0) {
      throw new Error("Faculty not found");
    }
    return result.rows[0];
  } finally {
    client.release();
  }
}

export { getAllFacultiesServices, getFacultyByIdServices };
