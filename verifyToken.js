// Import the jsonwebtoken library for JWT operations
import jwt from "jsonwebtoken";

/**
 * Middleware function to check the validity of a provided JWT token.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const checkToken = (req, res, next) => {
  // Retrieve the token from the "authorization" header
  let token = req.get("authorization");

  if (token) {
    // Remove "Bearer" from the token string
    token = token.slice(7);

    // Verify the token using the secret key from environment variables
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        // Respond with an error if the token is invalid
        return res.json({
          success: 0,
          message: "Invalid Token..."
        });
      } else {
        // Attach the decoded user information to the request object
        req.decoded = decoded;
        // Continue to the next middleware
        next();
      }
    });
  } else {
    // Respond with an error if no token is provided
    return res.json({
      success: 0,
      message: "Access Denied! Unauthorized User"
    });
  }
};
