const express = require("express");
const {
  getPosts,
  upvotePost,
  downvotePost,
  getPostDetails
} = require("../controllers/postController");

const router = express.Router();

// Route to fetch all posts
router.get("/", getPosts);

// Route to upvote a post by ID
router.put("/upvote/:id", upvotePost);

// Route to downvote a post by ID
router.put("/downvote/:id", downvotePost);

// Route to get details of a specific post
router.get("/:id", getPostDetails);

module.exports = router;
