const express = require('express');
const router = express.Router();

const AvailabilityController = require('../controllers/AvailabilityController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, AvailabilityController.create);
router.get('/:studentId', AvailabilityController.listByStudent);
router.get('/date/:date', authenticate, AvailabilityController.getByDate);


module.exports = router;






