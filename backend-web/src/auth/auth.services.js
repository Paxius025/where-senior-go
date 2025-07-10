import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../database/db.js";
import dotenv from "dotenv";

dotenv.config();

const registerService = async (email, username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const client = await pool.connect();
  try {
    const usernameExists = await client.query(
      "SELECT username FROM users WHERE username = $1",
      [username]
    );

    const emailExists = await client.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    );

    if (usernameExists.rows.length > 0) {
      throw new Error("Username already exists");
    }

    if (emailExists.rows.length > 0) {
      throw new Error("Email already exists");
    }

    const result = await client.query(
      "INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING user_id",
      [email, username, hashedPassword]
    );

    const user = result.rows[0];

    return user.user_id;
  } finally {
    client.release();
  }
};

const loginService = async (usernameOrEmail, password) => {
  const client = await pool.connect();
  try {
    const userExists = await client.query(
      "SELECT user_id,email, username, password_hash FROM users WHERE email = $1 OR username = $1",
      [usernameOrEmail]
    );

    if (userExists.rows.length === 0) {
      throw new Error("User not found");
    }

    const user = userExists.rows[0];

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      throw new Error("Invalid password");
    }
    
    return user;
  } finally {
    client.release();
  }
};

export { registerService, loginService };
