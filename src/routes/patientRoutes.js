const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');

router.post('/register', PatientController.register);

module.exports = router;

