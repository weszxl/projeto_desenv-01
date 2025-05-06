const Patient = require('../models/Patient');

class PatientController {
  static async register(req, res) {
    try {
      const { name, email, password, condition } = req.body;
      const patientId = await Patient.create({ name, email, password, condition });
      res.status(201).json({ id: patientId });
    } catch (error) {
      console.error('Erro no cadastro:', error);
      res.status(500).json({ error: 'Erro ao cadastrar paciente' });
    }
  }
}

module.exports = PatientController;
