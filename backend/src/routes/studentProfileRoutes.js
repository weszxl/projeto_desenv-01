const express = require('express');
const router = express.Router();
const StudentProfileController = require('../controllers/StudentProfileController');
const auth = require('../middlewares/auth');

router.get('/profile', auth, StudentProfileController.getProfile);
router.put('/profile', auth, StudentProfileController.updateProfile);

module.exports = router;