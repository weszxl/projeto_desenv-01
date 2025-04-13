const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');
const authenticate = require('../middlewares/auth');

router.post('/register', StudentController.register);
router.get('/me', authenticate, StudentController.getProfile);
router.put('/me', authenticate, StudentController.updateProfile);

module.exports = router;


