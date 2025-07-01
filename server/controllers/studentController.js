const db = require('../db');

// Register student
exports.registerStudent = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
  db.query(
    'INSERT INTO student (name, email, password, is_approved) VALUES (?, ?, ?, false)',
    [name, email, password],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Registration submitted, pending approval' });
    }
  );
};

// Student login (only approved students)
exports.loginStudent = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM student WHERE email = ? AND password = ? AND is_approved = true', [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials or not approved' });
    res.json({ message: 'Student login successful', user: results[0], role: 'student' });
  });
};

// Search teachers by name/department/subject
exports.searchTeachers = (req, res) => {
  const { q } = req.query;
  db.query(
    `SELECT * FROM teacher WHERE name LIKE ? OR department LIKE ? OR subject LIKE ?`,
    [`%${q}%`, `%${q}%`, `%${q}%`],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};


exports.getApprovedStudents = (req, res) => {
  const db = require('../db');
  db.query('SELECT * FROM student WHERE is_approved = 1', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};


exports.getMessagesForAppointment = (req, res) => {
  const { appointmentId } = req.params;
  const db = require('../db');
  db.query(
    'SELECT * FROM message WHERE appointment_id = ? ORDER BY sent_at ASC',
    [appointmentId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

exports.getPendingStudents = (req, res) => {
  db.query('SELECT * FROM student WHERE is_approved = 0', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};


// ...existing code...

// Get all messages for a student (across all their appointments)
exports.getAllMessagesForStudent = (req, res) => {
  const { studentId } = req.params;
  db.query(
    `SELECT m.*, a.teacher_id, a.student_id
     FROM message m
     JOIN appointment a ON m.appointment_id = a.id
     WHERE a.student_id = ?
     ORDER BY m.sent_at ASC`,
    [studentId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};



// Example for studentController.js
exports.sendMessage = (req, res) => {
  const { appointment_id, student_id, content } = req.body;
  if (!appointment_id || !student_id || !content) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  db.query(
    'INSERT INTO message (appointment_id, sender, content, sent_at, sender_id, sender_role) VALUES (?, ?, ?, NOW(), ?, ?)',
    [appointment_id, 'student', content, student_id, 'student'],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Message sent successfully' });
    }
  );
};