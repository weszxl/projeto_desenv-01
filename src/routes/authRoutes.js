const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const Student = require('../models/Student');
const Patient = require('../models/Patient');

router.post('/login', async (req, res) => {
  console.log('Dados recebidos:', req.body);
  const { email, password, role } = req.body;

  try {
    let user;
    if (role === 'student') {
      user = await Student.findByEmail(email);
    } else if (role === 'patient') {
      user = await Patient.findByEmail(email);
    }

    // verificação de usuário
    if (!user) {
      console.log('Usuário não encontrado');
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // verificação de senha BCRYPT
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Senha incorreta');
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // geração do token JWT
    const token = jwt.sign(
      { id: user.id, role: role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: "Erro no login" });
  }
});

module.exports = router;
