// Import necessary packages and modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/auth.js";

// Create an Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Load environment variables from a .env file
dotenv.config();

// Route for user authentication
app.use("/auth", userRouter);

// Global error handler middleware
app.use((err, req, res, next) => {
  // Extract error details or provide default values
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  // Respond with error status and message in JSON format
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Start the server on port 8800
app.listen(8800, () => {
  console.log("Connected to the backend.");
});
