const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const AvailabilityController = require('../controllers/AvailabilityController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, AvailabilityController.create);
router.get('/student/:studentId', AvailabilityController.listByStudent);
router.get('/date/:date', authenticate, AvailabilityController.getByDate);
router.delete('/:id', auth, AvailabilityController.delete);


module.exports = router;






