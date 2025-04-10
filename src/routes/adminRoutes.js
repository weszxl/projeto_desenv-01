const express = require('express');
const router = express.Router();
const authenticateAdmin = require('../middlewares/adminAuth');

// Listar todos os estudantes
router.get('/students', authenticateAdmin, async (req, res) => {
    const students = await db('students').select('*');
    res.json(students);
  });
  
  // Listar todas as consultas
  router.get('/appointments', authenticateAdmin, async (req, res) => {
    const appointments = await db('appointments').select('*');
    res.json(appointments);
  });
  
  module.exports = router;

  // HABILITAR NO DIRETÓRIO CONTROLLERS