// Import the database connection pool from "../db.js"
import { pool } from "../db.js";

/**
 * Inserts a new user into the database.
 * @param {Object} data - User data including name, email, and password.
 * @param {Function} callBack - Callback function to handle the result or error.
 */
export const create = (data, callBack) => {
  // Execute an SQL query to insert user data into the "users" table
  pool.query(
    `INSERT INTO users(name, email, password) VALUES (?, ?, ?)`,
    [data.name, data.email, data.password],
    (error, results, fields) => {
      if (error) {
        // Pass the error to the callback function
        callBack(error);
      }
      // Pass the results to the callback function
      return callBack(null, results);
    }
  );
};

/**
 * Retrieves a user from the database based on their email.
 * @param {string} email - User email for fetching user data.
 * @param {Function} callBack - Callback function to handle the result or error.
 */
export const getUserByUserEmail = (email, callBack) => {
  // Execute an SQL query to select a user by email from the "users" table
  pool.query(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    (error, results, fields) => {
      if (error) {
        // Pass the error to the callback function
        callBack(error);
      }
      // Pass the first result (user data) to the callback function
      return callBack(null, results[0]);
    }
  );
};
