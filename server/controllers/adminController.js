const db = require('../db');

exports.registerAdmin = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'All fields required' });

  db.query(
    'INSERT INTO admin (username, password) VALUES (?, ?)',
    [username, password],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Username already exists' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Admin registered successfully' });
    }
  );
};