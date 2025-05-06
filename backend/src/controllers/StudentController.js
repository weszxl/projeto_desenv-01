const Student = require('../models/Student');

class StudentController {
  static async register(req, res) {
    try {
      const { name, email, password, area } = req.body;
      const studentId = await Student.create({ name, email, password, area });
      res.status(201).json({ id: studentId });
    } catch (error) {
      console.error('Erro no cadastro:', error);
      res.status(500).json({ error: 'Erro ao cadastrar estudante' });
    }
  }

  static async getProfile(req, res) {
    try {
      const student = await Student.findById(req.user.id);
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar perfil' });
    }
  }

  static async updateProfile(req, res) {
    try {
      const { name, area } = req.body;
      await Student.update(req.user.id, { name, area });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar perfil' });
    }
  }
}

module.exports = StudentController;
