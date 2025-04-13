const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const authenticateAdmin = require('../middlewares/adminAuth');

router.get('/students', authenticateAdmin, AdminController.listStudents);
router.get('/appointments', authenticateAdmin, AdminController.listAppointments);

module.exports = router;
