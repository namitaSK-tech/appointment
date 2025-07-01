const db = require('../db');

// Admin login
exports.adminLogin = (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Admin login successful', user: results[0], role: 'admin' });
  });
};

// Teacher login
exports.teacherLogin = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM teacher WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Teacher login successful', user: results[0], role: 'teacher' });
  });
};

// Student login (only approved students)
exports.studentLogin = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM student WHERE email = ? AND password = ? AND is_approved = true', [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials or not approved' });
    res.json({ message: 'Student login successful', user: results[0], role: 'student' });
  });
};