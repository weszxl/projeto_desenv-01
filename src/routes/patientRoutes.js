const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
  try {
    const { name, email, password, condition } = req.body; //
    const patientId = await Patient.create({ name, email, password, condition });
    res.status(201).json({ id: patientId });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ error: 'Erro ao cadastrar' });
  }
});



module.exports = router;
