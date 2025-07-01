const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/admin', loginController.adminLogin);
router.post('/teacher', loginController.teacherLogin);
router.post('/student', loginController.studentLogin);

module.exports = router;