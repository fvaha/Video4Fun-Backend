const db = require("../config/db"); // Database connection setup

// Fetch all posts
exports.getPosts = (req, res) => {
  const query = "SELECT * FROM posts";  // Modify based on your actual post table schema
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching posts: " + err.message);
      return res.status(500).send("Server error");
    }
    res.status(200).json(results);  // Return posts as JSON
  });
};

// Upvote a post
exports.upvotePost = (req, res) => {
  const postId = req.params.id;

  // Update the upvotes count in the database
  db.query("UPDATE posts SET upvotes = upvotes + 1 WHERE id = ?", [postId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }

    res.status(200).send({ message: "Upvote successful!" });
  });
};

// Downvote a post
exports.downvotePost = (req, res) => {
  const postId = req.params.id;

  // Update the downvotes count in the database
  db.query("UPDATE posts SET downvotes = downvotes + 1 WHERE id = ?", [postId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }

    res.status(200).send({ message: "Downvote successful!" });
  });
};

// Get post details (with description, upvotes, downvotes, etc.)
exports.getPostDetails = (req, res) => {
  const postId = req.params.id;

  // Fetch post details (including votes) from the database
  db.query("SELECT * FROM posts WHERE id = ?", [postId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }
    if (result.length === 0) {
      return res.status(404).send("Post not found");
    }

    res.status(200).json(result[0]);
  });
};
