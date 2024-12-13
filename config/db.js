const mysql = require("mysql2");

// Database connection configuration
const db = mysql.createConnection({
  host: "89.216.114.190", // IP address of your MySQL server
  user: "adminvideo4",     // Your MySQL username
  password: "vfpcjbP5swBL0kP", // Your MySQL password
  database: "video4",      // The database name you want to use
  port: 3333,              // Port number for MySQL
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
