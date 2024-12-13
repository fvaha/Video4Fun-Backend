const express = require("express");
const upload = require("../config/multerConfig");  // Adjusted to point to your actual multer config
const { uploadFile } = require("../controllers/uploadController");  // Your file handling logic
const router = express.Router();

// Upload a file and create a post
router.post("/", upload.single("file"), uploadFile);  // 'file' should match the input field name in your form

module.exports = router;
