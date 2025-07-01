const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/send', messageController.sendMessage);
router.get('/appointment/:appointmentId', messageController.getMessagesForAppointment);
router.get('/teacher/:teacherId', messageController.getMessagesForTeacher);



module.exports = router;