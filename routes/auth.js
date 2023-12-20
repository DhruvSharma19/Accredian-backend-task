// Import the Express framework
import express from "express";

// Import authentication controllers and token verification middleware
import { createUser, login } from "../controllers/auth.js";
import { checkToken } from "../verifyToken.js";

// Create a new Express router
const router = express.Router();

/**
 * Route to handle user registration.
 * Endpoint: POST /auth
 * Controller: createUser
 */
router.post("/", createUser);

/**
 * Route to handle user login.
 * Endpoint: POST /auth/login
 * Controller: login
 */
router.post("/login", login);

/**
 * Example of a protected route requiring a valid token for access.
 * Uncomment the line below and add the checkToken middleware to any route
 * that requires authentication.
 */
// router.get("/protected", checkToken, (req, res) => res.send("Protected Route"));

// Export the router for use in the main application
export default router;
