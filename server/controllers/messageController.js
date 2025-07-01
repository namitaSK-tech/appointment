const db = require('../db');

exports.sendMessage = (req, res) => {
  const { appointment_id, sender, content } = req.body;
  if (!appointment_id || !sender || !content) {
    return res.status(400).json({ error: 'All fields required' });
  }
  db.query(
    'INSERT INTO message (appointment_id, sender, content, sent_at) VALUES (?, ?, ?, NOW())',
    [appointment_id, sender, content],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Message sent' });
    }
  );
};

exports.getMessagesForAppointment = (req, res) => {
  const { appointmentId } = req.params;
  db.query(
    'SELECT * FROM message WHERE appointment_id = ? ORDER BY sent_at ASC',
    [appointmentId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

exports.getMessagesForTeacher = (req, res) => {
  const { teacherId } = req.params;
  const db = require('../db');
  db.query(
    `SELECT m.* FROM message m
     JOIN appointment a ON m.appointment_id = a.id
     WHERE a.teacher_id = ? ORDER BY m.sent_at ASC`,
    [teacherId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};