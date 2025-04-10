const express = require('express');
const router = express.Router();
const Availability = require('../models/Availability');
const authenticate = require('../middlewares/auth');

// cadastrar horário disponível
router.post('/', authenticate, async (req, res) => {
  try {
    const { start_time, end_time } = req.body;
    const student_id = req.user.id; 

    const availabilityId = await Availability.create({
      student_id,
      start_time,
      end_time,
    });

    res.status(201).json({ id: availabilityId });
  } catch (error) {
    res.status(500).json({ error: 'Erro disponibilizar horário' });
  }
});

// listar disponibilidade de um estudante
router.get('/:student_id', async (req, res) => {
  try {
    const availability = await Availability.findByStudentId(req.params.student_id);
    res.json(availability);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar' });
  }
});

module.exports = router;

