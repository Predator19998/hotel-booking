const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 5000;

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

// Fetch hotels data from the database
app.get('/hotels', (req, res) => {
  const sql = 'SELECT * FROM hotels';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching hotels:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Fetch rooms data for a specific hotel from the database
app.get('/rooms/:hotelId', (req, res) => {
  const { hotelId } = req.params;
  const sql = 'SELECT * FROM rooms WHERE hotel_id = ?';
  db.query(sql, [hotelId], (err, results) => {
    if (err) {
      console.error('Error fetching rooms:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(200).json(results);
    }
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
