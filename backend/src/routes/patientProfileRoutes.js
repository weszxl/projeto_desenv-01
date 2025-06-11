const express = require('express');
const router = express.Router();
const PatientProfileController = require('../controllers/PatientProfileController');
const auth = require('../middlewares/auth');

router.get('/profile', auth, PatientProfileController.getProfile);
router.put('/profile', auth, PatientProfileController.updateProfile);

module.exports = router;