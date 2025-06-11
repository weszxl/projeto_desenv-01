const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

class UserController {
  // cadastro de pacientes (rota normal pelo front)
  static async registerPatient(req, res) {
    const { name, email, password, cpf } = req.body;
    
    try {
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'preencha todos os campos' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'formato de email inválido' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'senha deve ter no mínimo 6 caracteres' });
      }

      if (await User.isEmailTaken(email)) {
        return res.status(400).json({ error: 'email já cadastrado' });
      }

      //const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await User.create({
        name,
        email,
        password,
        role: 'patient',
        cpf 
      });

      const token = generateToken({
        id: user.id,
        role: user.role,
        name: user.name
      });

      res.status(201).json({ 
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email,
          role: user.role,
          cpf: user.cpf
        },
        token 
      });
    } catch (error) {
      console.error('Erro no cadastro de paciente:', error);
      res.status(500).json({ error: 'erro no cadastro' });
    }
  }

  // cadastro de estudantes (apenas pelo admin)
  static async registerStudent(req, res) {
    const { name, email, password, cpf } = req.body;
    
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'acesso negado' });
      }

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'preencha todos os campos' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'formato de email inválido' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'senha deve ter no mínimo 6 caracteres' });
      }

      if (await User.isEmailTaken(email)) {
        return res.status(400).json({ error: 'email já cadastrado' });
      }

      //const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await User.create({
        name,
        email,
        password,
        role: 'student',
        cpf 
      });

      res.status(201).json({ 
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email,
          role: user.role,
          cpf: user.cpf
        }
      });
    } catch (error) {
      console.error('Erro no cadastro de estudante:', error);
      res.status(500).json({ error: 'erro no cadastro de estudante' });
    }
  }

  static async listUsers(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'acesso negado' });
      }

      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({ error: 'erro ao listar usuários' });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      
      if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
        return res.status(403).json({ error: 'acesso negado' });
      }

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'usuário não encontrado' });
      }

      res.json(user);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ error: 'erro ao buscar usuário' });
    }
  }
}

module.exports = UserController;