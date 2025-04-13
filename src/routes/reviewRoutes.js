const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, ReviewController.createReview);
router.get('/:student_id', ReviewController.listReviewsByStudent);

module.exports = router;
