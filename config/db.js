const mysql = require("mysql2");

// Database connection configuration
const db = mysql.createConnection({
  host: "", // IP address of your MySQL server
  user: "",     // Your MySQL username
  password: "", // Your MySQL password
  database: "",      // The database name you want to use
  port: ,              // Port number for MySQL
});

// Establish connection to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database as id " + db.threadId);
});

module.exports = db;
