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

export { getAllFacultiesServices };
