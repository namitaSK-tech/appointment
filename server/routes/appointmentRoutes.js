const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacherController');

const appointmentController = require('../controllers/appointmentController');

router.get('/teacher/:teacherId', appointmentController.getAppointmentsForTeacher);
router.put('/:id/status', appointmentController.updateAppointmentStatus);
router.post('/book', appointmentController.bookAppointment);
router.post('/teacher-schedule', appointmentController.teacherScheduleAppointment);
router.get('/student/:studentId', appointmentController.getAppointmentsForStudent);
router.post('/book-appointment', teacherController.bookAppointment);
router.put('/:id/status', teacherController.updateAppointmentStatus);

module.exports = router;