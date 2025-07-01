const db = require('../db');

exports.getAllMessagesForTeacher = (req, res) => {
  const { teacherId } = req.params;
  db.query(
    `SELECT m.*, a.student_id, a.teacher_id
     FROM message m
     JOIN appointment a ON m.appointment_id = a.id
     WHERE a.teacher_id = ?
     ORDER BY m.sent_at ASC`,
    [teacherId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

exports.getAllTeachers = (req, res) => {
  db.query('SELECT * FROM teacher', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};



exports.bookAppointment = (req, res) => {
  // Your logic for booking an appointment
  // Example:
  const { teacher_id, student_id, appointment_time, purpose } = req.body;
  db.query(
    'INSERT INTO appointment (teacher_id, student_id, appointment_time, purpose, status) VALUES (?, ?, ?, ?, "pending")',
    [teacher_id, student_id, appointment_time, purpose],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Appointment booked successfully' });
    }
  );
};




exports.addTeacher = (req, res) => {
  const { name, email, department, subject } = req.body;
  db.query(
    'INSERT INTO teacher (name, email, department, subject) VALUES (?, ?, ?, ?)',
    [name, email, department, subject],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Teacher added successfully' });
    }
  );
};



exports.getTeacherById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM teacher WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Teacher not found' });
    res.json(results[0]);
  });
};




exports.updateTeacher = (req, res) => {
  const { id } = req.params;
  const { name, email, department, subject } = req.body;
  db.query(
    'UPDATE teacher SET name = ?, email = ?, department = ?, subject = ? WHERE id = ?',
    [name, email, department, subject, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Teacher not found' });
      res.json({ message: 'Teacher updated successfully' });
    }
  );
};



exports.deleteTeacher = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM teacher WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Teacher not found' });
    res.json({ message: 'Teacher deleted successfully' });
  });
};





exports.sendMessage = (req, res) => {
  const { appointment_id, teacher_id, content } = req.body;
  if (!appointment_id || !teacher_id || !content) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  db.query(
    'INSERT INTO message (appointment_id, sender, content, sent_at, sender_id, sender_role) VALUES (?, ?, ?, NOW(), ?, ?)',
    [appointment_id, 'teacher', content, teacher_id, 'teacher'],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Message sent successfully' });
    }
  );
};




exports.updateAppointmentStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // status should be 'approved' or 'cancelled'
  if (!['approved', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  db.query(
    'UPDATE appointment SET status = ? WHERE id = ?',
    [status, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Appointment not found' });
      res.json({ message: `Appointment ${status}` });
    }
  );
};