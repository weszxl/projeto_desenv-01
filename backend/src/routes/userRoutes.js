const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/auth');

router.post('/register/patient', UserController.registerPatient);

router.post('/register/student', authMiddleware, UserController.registerStudent);

module.exports = router;