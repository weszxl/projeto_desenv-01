const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Student = require('../models/Student');
const Patient = require('../models/Patient');

class AuthController {
  static async login(req, res) {
    const { email, password, role } = req.body;

    try {
      // determinar o modelo com base na role = estudante ou paciente
      const Model = role === 'student' ? Student : Patient;
      const user = await Model.findByEmail(email);

      if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      // gerar token JWT de 3 horas
      const token = jwt.sign(
        { id: user.id, role },
        process.env.JWT_SECRET,
        { expiresIn: '3h' }
      );

      res.json({ token });

    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: "Erro no servidor durante o login" });
    }
  }
}

module.exports = AuthController;
