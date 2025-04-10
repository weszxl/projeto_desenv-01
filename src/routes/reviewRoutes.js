const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const authenticate = require('../middlewares/auth');

// criar avaliação 
router.post('/', authenticate, async (req, res) => {
  if (req.user.role !== 'patient') {
    return res.status(403).json({ error: "Acesso negado" });
  }

  try {
    const { student_id, rating, comment } = req.body;
    const reviewId = await Review.create({
      student_id,
      patient_id: req.user.id, // ID do paciente autenticado
      rating,
      comment,
    });
    res.status(201).json({ id: reviewId });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar avaliação' });
  }
});

// listar avaliações de um estudante
router.get('/:student_id', async (req, res) => {
  try {
    const reviews = await Review.findByStudentId(req.params.student_id);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar avaliações' });
  }
});

module.exports = router;
