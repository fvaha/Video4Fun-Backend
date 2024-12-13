const express = require("express");
const path = require("node:path");
const cors = require("cors"); // Add CORS middleware
const morgan = require("morgan"); // Add request logging
const dotenv = require("dotenv"); // Add environment variable support

// Load environment variables from .env file
dotenv.config();

const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const commentRoutes = require("./routes/commentsRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all origins (adjust as needed)
app.use(express.json()); // Parse JSON request bodies
app.use(morgan("dev")); // Log HTTP requests

// Static file serving for uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userRoutes);  // User registration and login routes
app.use("/api/uploads", uploadRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/posts", postRoutes);

// Basic welcome route
app.get("/", (req, res) => {
  res.send("Welcome to the Video4Fun Backend!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Handle 404 errors for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
