const path = require("node:path");
const fs = require("fs");
const db = require("../config/db"); // Database connection

// Handle file upload and save post info to the database
const uploadFile = (req, res) => {
  // Check if file is uploaded
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  // Extract file path and type
  const userId = req.body.userId;  // Ensure userId is in the request body
  const filePath = path.join("uploads", userId.toString(), req.file.filename);  // Relative path to store
  const fileType = req.file.mimetype;  // The MIME type of the uploaded file
  const { description } = req.body;  // Extract the description from the request body

  // Ensure the 'userId' and 'description' are provided
  if (!userId || !description) {
    return res.status(400).json({ message: "Missing userId or description." });
  }

  // Save file information into the database
  const query = "INSERT INTO posts (user_id, file_path, file_type, description) VALUES (?, ?, ?, ?)";
  db.query(query, [userId, filePath, fileType, description], (err, result) => {
    if (err) {
      console.error("Error saving post to database: " + err.message);
      return res.status(500).json({ message: "Error saving post" });
    }

    // Return a success response with the postId and file path
    res.status(201).json({
      message: "Post created successfully!",
      postId: result.insertId,
      filePath: filePath,  // The relative path to the uploaded file
    });
  });
};

module.exports = { uploadFile };
