const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 3306;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mostwanted@2",
  database: "hotel-booking",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to the database");
  }
});

// Handle user login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "An error occurred" });
    } else {
      if (results.length === 0) {
        res.status(401).json({ error: "Invalid email or password" });
      } else {
        res.status(200).json({ message: "Login successful" });
      }
    }
  });
});

// Add this route to your server.js
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Signup error:", err);
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.status(200).json({ message: "Signup successful" });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
