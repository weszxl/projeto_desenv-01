const express = require('express');
const AppointmentController = require('../controllers/AppointmentController');
const authenticate = require('../middlewares/auth');

const router = express.Router();

router.post('/', authenticate, AppointmentController.create);
router.get('/', authenticate, AppointmentController.list);

module.exports = router;






