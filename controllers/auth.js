// Import functions from the auth service and bcrypt for password hashing
import { create, getUserByUserEmail } from "../services/auth.js";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import Jwt from "jsonwebtoken";

/**
 * Controller function for user registration.
 * Hashes the password and calls the create function from the auth service.
 * Responds with success or failure JSON based on the database operation.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const createUser = (req, res) => {
    try {
        // Extract user data from the request body
        const body = req.body;
        
        // Generate a salt and hash the password
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        // Call the create function from the auth service
        create(body, (err, results) => {
            if (err) {
                // Respond with a database connection error
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            // Respond with success and the database results
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    } catch (err) {
        // Respond with a generic database connection error
        return res.status(500).json({
            success: 0,
            message: "Database connection error"
        });
    }
};

/**
 * Controller function for user login.
 * Compares the hashed password and issues a JWT token upon successful login.
 * Responds with success or failure JSON based on the login attempt.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const login = (req, res) => {
    try {
        // Extract user data from the request body
        const body = req.body;

        // Call the getUserByUserEmail function from the auth service
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                // Handle database connection error
            }
            
            // Check if a user with the provided email exists
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }

            // Compare the provided password with the hashed password in the database
            const result = compareSync(body.password, results.password);

            // Issue a JWT token upon successful login
            if (result) {
                results.password = undefined;
                const jsontoken = Jwt.sign({ result: results }, "qwe1234", {
                    expiresIn: "1h"
                });

                // Respond with success and the JWT token
                return res.json({
                    success: 1,
                    message: "Login successful",
                    token: jsontoken
                });
            } else {
                // Respond with failure for invalid email or password
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    } catch (err) {
        // Respond with a generic database connection error
        return res.status(500).json({
            success: 0,
            message: "Database connection error"
        });
    }
};
