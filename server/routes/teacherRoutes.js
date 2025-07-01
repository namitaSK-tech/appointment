const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const messageController = require('../controllers/messageController');

// More specific routes FIRST!
router.get('/all-messages/:teacherId', teacherController.getAllMessagesForTeacher);
router.get('/teacher/:teacherId/messages', messageController.getMessagesForTeacher);

// Get all teachers
router.get('/', teacherController.getAllTeachers);

// Add a new teacher
router.post('/', teacherController.addTeacher);

// Book appointment
router.post('/book-appointment', teacherController.bookAppointment);

// Get a teacher by ID
router.get('/:id', teacherController.getTeacherById);

// Update a teacher by ID
router.put('/:id', teacherController.updateTeacher);

// Delete a teacher by ID
router.delete('/:id', teacherController.deleteTeacher);
router.post('/send-message', teacherController.sendMessage);

module.exports = router;