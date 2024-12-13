const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController"); // Import the controller

// Route for adding a comment to a post
router.post("/:postId/comments", commentController.addComment);

// Route for getting all comments for a post
router.get("/:postId/comments", commentController.getComments);

// Route for upvoting a comment
router.post("/:commentId/upvote", commentController.upvoteComment);

// Route for downvoting a comment
router.post("/:commentId/downvote", commentController.downvoteComment);

// Route for deleting a comment (only if the user is the author)
router.delete("/:commentId", commentController.deleteComment);

module.exports = router;
