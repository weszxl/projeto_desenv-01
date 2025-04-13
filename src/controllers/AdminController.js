const db = require('../config/database');

class AdminController {
  static async listStudents(req, res) {
    try {
      const students = await db('students').select('*');
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar estudantes' });
    }
  }

  static async listAppointments(req, res) {
    try {
      const appointments = await db('appointments').select('*');
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar consultas' });
    }
  }
}

module.exports = AdminController;
