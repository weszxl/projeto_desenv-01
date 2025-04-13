const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const AppointmentController = require('../controllers/AppointmentController');
const authenticate = require('../middlewares/auth');

// console.log('DEBUG scheduleAppointment:', AppointmentController.scheduleAppointment);

router.use(authenticate);

router.post(
  '/schedule',
  authenticate,
  ...[ 
    check('student_id').isNumeric(),
    check('start_time').isISO8601(),
    check('end_time').isISO8601(),
    check('availability_id').optional().isNumeric()
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  AppointmentController.scheduleAppointment 
);

router.get('/my-appointments', authenticate, AppointmentController.listAppointments);

module.exports = router;




