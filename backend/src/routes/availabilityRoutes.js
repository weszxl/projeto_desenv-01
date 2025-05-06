const express = require('express');
const router = express.Router();
const AvailabilityController = require('../controllers/AvailabilityController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, AvailabilityController.createAvailability);
router.get('/:student_id', AvailabilityController.listByStudent);

module.exports = router;


