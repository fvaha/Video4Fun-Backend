const db = require("../config/db"); // Assuming your DB connection setup is here

// Add a comment to a post
const addComment = (req, res) => {
  const { postId, userId, commentText } = req.body;

  // Input validation (simple check to ensure all fields are provided)
  if (!postId || !userId || !commentText) {
    return res.status(400).send({ message: "Post ID, User ID, and Comment Text are required." });
  }

  // Insert the comment into the database
  const insertCommentQuery = "INSERT INTO comments (post_id, user_id, comment_text) VALUES (?, ?, ?)";

  db.query(insertCommentQuery, [postId, userId, commentText], (err, result) => {
    if (err) {
      console.error("Error adding comment: " + err.message);
      return res.status(500).send({ message: "Server error" });
    }

    // Optionally, update the post's comment count (if you have that field in your post table)
    db.query("UPDATE posts SET comment_count = comment_count + 1 WHERE id = ?", [postId], (err) => {
      if (err) {
        console.error("Error updating comment count: " + err.message);
        return res.status(500).send({ message: "Server error" });
      }

      // Send a successful response
      res.status(201).send({
        message: "Comment added successfully!",
        commentId: result.insertId // Return the ID of the newly inserted comment
      });
    });
  });
};

// Get all comments for a particular post
const getComments = (req, res) => {
  const postId = req.params.postId;

  if (!postId) {
    return res.status(400).send({ message: "Post ID is required." });
  }

  // Fetch all comments for the specified post ID
  const getCommentsQuery = "SELECT comments.id, comments.comment_text, users.username, comments.upvotes, comments.downvotes FROM comments JOIN users ON comments.user_id = users.id WHERE comments.post_id = ? ORDER BY comments.created_at DESC";

  db.query(getCommentsQuery, [postId], (err, results) => {
    if (err) {
      console.error("Error retrieving comments: " + err.message);
      return res.status(500).send({ message: "Server error" });
    }

    // Send the list of comments with upvotes/downvotes
    res.status(200).send({ comments: results });
  });
};

// Upvote a comment
const upvoteComment = (req, res) => {
  const commentId = req.params.commentId;

  // Check if the comment exists
  db.query("SELECT * FROM comments WHERE id = ?", [commentId], (err, result) => {
    if (err) {
      console.error("Error checking comment: " + err.message);
      return res.status(500).send({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(404).send({ message: "Comment not found" });
    }

    // Update the upvotes count for the comment
    db.query("UPDATE comments SET upvotes = upvotes + 1 WHERE id = ?", [commentId], (err) => {
      if (err) {
        console.error("Error updating upvotes: " + err.message);
        return res.status(500).send({ message: "Server error" });
      }

      res.status(200).send({ message: "Upvote successful!" });
    });
  });
};

// Downvote a comment
const downvoteComment = (req, res) => {
  const commentId = req.params.commentId;

  // Check if the comment exists
  db.query("SELECT * FROM comments WHERE id = ?", [commentId], (err, result) => {
    if (err) {
      console.error("Error checking comment: " + err.message);
      return res.status(500).send({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(404).send({ message: "Comment not found" });
    }

    // Update the downvotes count for the comment
    db.query("UPDATE comments SET downvotes = downvotes + 1 WHERE id = ?", [commentId], (err) => {
      if (err) {
        console.error("Error updating downvotes: " + err.message);
        return res.status(500).send({ message: "Server error" });
      }

      res.status(200).send({ message: "Downvote successful!" });
    });
  });
};

// Delete a comment (if the user is the author of the comment)
const deleteComment = (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.body.userId; // User trying to delete the comment

  if (!commentId || !userId) {
    return res.status(400).send({ message: "Comment ID and User ID are required." });
  }

  // Check if the comment exists and if the user is the author
  const checkCommentQuery = "SELECT user_id FROM comments WHERE id = ?";
  db.query(checkCommentQuery, [commentId], (err, results) => {
    if (err) {
      console.error("Error checking comment: " + err.message);
      return res.status(500).send({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).send({ message: "Comment not found" });
    }

    const commentUserId = results[0].user_id;

    // If the user is not the author, they cannot delete the comment
    if (commentUserId !== userId) {
      return res.status(403).send({ message: "You do not have permission to delete this comment." });
    }

    // Delete the comment from the database
    const deleteCommentQuery = "DELETE FROM comments WHERE id = ?";
    db.query(deleteCommentQuery, [commentId], (err, result) => {
      if (err) {
        console.error("Error deleting comment: " + err.message);
        return res.status(500).send({ message: "Server error" });
      }

      // Send success response
      res.status(200).send({ message: "Comment deleted successfully!" });
    });
  });
};

module.exports = {
  addComment,
  getComments,
  upvoteComment,
  downvoteComment,
  deleteComment
};
