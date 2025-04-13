const Review = require('../models/Review');

class ReviewController {
  static async createReview(req, res) {
    try {
      if (req.user.role !== 'patient') {
        return res.status(403).json({ error: "Acesso permitido apenas para pacientes" });
      }

      const { student_id, rating, comment } = req.body;
      const reviewData = {
        student_id,
        patient_id: req.user.id,
        rating,
        comment
      };

      const reviewId = await Review.create(reviewData);
      res.status(201).json({ id: reviewId });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar avaliação' });
    }
  }

  static async listReviewsByStudent(req, res) {
    try {
      const reviews = await Review.findByStudentId(req.params.student_id);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar avaliações' });
    }
  }
}

module.exports = ReviewController;
