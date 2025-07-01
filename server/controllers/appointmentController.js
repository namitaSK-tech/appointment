const db = require('../db');

exports.getAppointmentsForTeacher = (req, res) => {
  const { teacherId } = req.params;
  db.query(
    'SELECT * FROM appointment WHERE teacher_id = ?',
    [teacherId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

exports.updateAppointmentStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.query(
    'UPDATE appointment SET status = ? WHERE id = ?',
    [status, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Status updated' });
    }
  );
};



exports.bookAppointment = (req, res) => {
  const { student_id, teacher_id, appointment_time, purpose } = req.body;
  if (!student_id || !teacher_id || !appointment_time || !purpose) {
    return res.status(400).json({ error: 'All fields required' });
  }
  // Check for duplicate
  db.query(
    'SELECT * FROM appointment WHERE student_id = ? AND teacher_id = ? AND appointment_time = ?',
    [student_id, teacher_id, appointment_time],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) {
        return res.status(400).json({ error: 'Duplicate appointment exists for this time.' });
      }
      // Insert if not duplicate
      db.query(
        'INSERT INTO appointment (student_id, teacher_id, appointment_time, purpose, status) VALUES (?, ?, ?, ?, "pending")',
        [student_id, teacher_id, appointment_time, purpose],
        (err2, result) => {
          if (err2) return res.status(500).json({ error: err2.message });
          res.status(201).json({ message: 'Appointment booked, pending approval' });
        }
      );
    }
  );
};

exports.teacherScheduleAppointment = (req, res) => {
  const { teacher_id, student_id, appointment_time, purpose } = req.body;
  if (!teacher_id || !student_id || !appointment_time || !purpose) {
    return res.status(400).json({ error: 'All fields required' });
  }
  // Check for duplicate
  db.query(
    'SELECT * FROM appointment WHERE student_id = ? AND teacher_id = ? AND appointment_time = ?',
    [student_id, teacher_id, appointment_time],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) {
        return res.status(400).json({ error: 'Duplicate appointment exists for this time.' });
      }
      // Insert if not duplicate
      db.query(
        'INSERT INTO appointment (teacher_id, student_id, appointment_time, purpose, status) VALUES (?, ?, ?, ?, "approved")',
        [teacher_id, student_id, appointment_time, purpose],
        (err2, result) => {
          if (err2) return res.status(500).json({ error: err2.message });
          res.status(201).json({ message: 'Appointment scheduled successfully' });
        }
      );
    }
  );
};



exports.getAppointmentsForStudent = (req, res) => {
  const { studentId } = req.params;
  const db = require('../db');
  db.query(
    'SELECT * FROM appointment WHERE student_id = ?',
    [studentId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};