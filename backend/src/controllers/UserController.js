const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

class UserController {
// cadastro de pacientes (rota normal pelo front)
  static async registerPatient(req, res) {
    const { name, email, password } = req.body;
    
    try {
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'preencha todos os campos' });
      }

      if (await User.isEmailTaken(email)) {
        return res.status(400).json({ error: 'email já cadastrado' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'patient' // todos os cadastros por essa rora recebem o role de 'patient'
      });

      const token = generateToken({
        id: user.id,
        role: user.role,
        name: user.name
      });

      res.status(201).json({ 
        user: { id: user.id, name: user.name, role: user.role },
        token 
      });
    } catch (error) {
      res.status(500).json({ error: 'erro no cadastro' });
    }
  }

// cadastro de estudantes (apenas pelo admin)
  static async registerStudent(req, res) {
    const { name, email, password } = req.body;
    
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'acesso negado' });
      }

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'preencha todos os campos' });
      }

      if (await User.isEmailTaken(email)) {
        return res.status(400).json({ error: 'email já cadastrado' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'student' // todos os cadastrados recebem a role de 'student'
      });

      res.status(201).json({ 
        user: { id: user.id, name: user.name, role: user.role }
      });
    } catch (error) {
      res.status(500).json({ error: 'erro no cadastro de estudante' });
    }
  }
}

module.exports = UserController;