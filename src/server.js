const express = require('express');
const mysql = require('mysql2'); // or 'mysql' if you're using that
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // allow cross-origin requests from frontend
app.use(express.json()); // parse incoming JSON bodies

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'users',
});

// Test DB connection
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL DB');
});

// PUT route for updating user profile
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email, phone, city, state, postCode, country } = req.body;

  const sql = `
    UPDATE users 
    SET name = ?, email = ?, phone = ?, city = ?, state = ?, postCode = ?, country = ? 
    WHERE id = ?`;

  const params = [name, email, phone, city, state, postCode, country, userId];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
