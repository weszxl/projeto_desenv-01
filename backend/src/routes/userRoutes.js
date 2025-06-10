const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/auth');

router.post('/register', UserController.registerPatient);

router.use(authMiddleware);
router.post('/register/student', UserController.registerStudent);
router.get('/users', UserController.listUsers);
router.get('/users/:id', UserController.getUserById);

module.exports = router;