const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const authenticate = require('../middlewares/auth')

// Cadastro de estudante
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, area } = req.body; // Adicione "password"
    const studentId = await Student.create({ name, email, password, area });
    res.status(201).json({ id: studentId });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ error: 'Erro ao cadastrar estudante' });
  }
});


router.get('/me', authenticate, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id); 
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
});

router.put('/me', authenticate, async (req, res) => {
  try {
    const { name, area } = req.body;
    await Student.update(req.user.id, { name, area }); 
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
});



module.exports = router;