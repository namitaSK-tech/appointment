const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const messageController = require('../controllers/messageController');
router.post('/register', studentController.registerStudent);
router.post('/login', studentController.loginStudent);
router.get('/search-teachers', studentController.searchTeachers);
router.get('/approved', studentController.getApprovedStudents);
router.get('/appointment/:appointmentId', messageController.getMessagesForAppointment);
// ...existing code...
router.get('/pending', studentController.getPendingStudents);
// filepath: c:\xampp\htdocs\appointment\server\routes\studentRoutes.js
router.get('/all-messages/:studentId', studentController.getAllMessagesForStudent);
router.post('/send-message', studentController.sendMessage);

// ...existing code...
module.exports = router;
