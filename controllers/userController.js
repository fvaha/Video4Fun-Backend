const db = require("../config/db"); // Assuming your DB connection is configured here

// Register user function
const registerUser = (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists in the database
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error("Error checking user: " + err.message);
      return res.status(500).send("Server error");
    }

    if (results.length > 0) {
      return res.status(400).send("User already exists.");
    }

    // Insert the new user into the database
    const insertUserQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(insertUserQuery, [username, email, password], (err, result) => {
      if (err) {
        console.error("Error inserting user: " + err.message);
        return res.status(500).send("Server error");
      }

      const newUserId = result.insertId; // Get the new user's ID

      res.status(201).send({
        message: "User registered successfully!",
        userId: newUserId,
      });
    });
  });
};

// Login user function
const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error("Error checking user: " + err.message);
      return res.status(500).send("Server error");
    }

    if (results.length === 0) {
      return res.status(400).send("User does not exist.");
    }

    const user = results[0];

    // Check if password matches
    if (password !== user.password) {
      return res.status(401).send("Invalid email or password.");
    }

    // If credentials are correct, send a success message
    res.status(200).send({
      message: "Login successful!",
      userId: user.id, // You can send user info if needed
    });
  });
};

module.exports = { registerUser, loginUser };
