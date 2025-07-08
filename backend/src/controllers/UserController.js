const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const db = require('../config/database');

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

  // cadastro de estudantes (apenas por professor)
  static async registerStudent(req, res) {
    const { name, email, password, cpf, ...profileData } = req.body;
    
    try {
      if (req.user.role !== 'professor') {
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

      const user = await User.create({
        name,
        email,
        password,
        role: 'student',
        cpf
      });

      // student_profile vinculado ao professor
      await db('student_profiles').insert({
        user_id: user.id,
        professor_id: req.user.id,
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

  // cadastro de professores (apenas pelo admin)
  static async registerProfessor(req, res) {
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

      const user = await User.create({
        name,
        email,
        password,
        role: 'professor',
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
      console.error('Erro no cadastro de professor:', error);
      res.status(500).json({ error: 'erro no cadastro de professor' });
    }
  }

  // (admin)listar todos usuários
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

  // (admin)buscar usuário por id
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

  // (professor) listar alunos
  static async listMyStudents(req, res) {
  try {
    if (req.user.role !== 'professor') {
      return res.status(403).json({ error: 'acesso negado' });
    }

    const students = await db('student_profiles')
      .join('users', 'student_profiles.user_id', 'users.id')
      .where('student_profiles.professor_id', req.user.id)
      .select(
        'users.id', 'users.name', 'users.email', 'users.cpf',
        'student_profiles.*'
      );

    res.json(students);
  } catch (error) {
    console.error('Erro ao listar alunos:', error);
    res.status(500).json({ error: 'erro ao listar alunos' });
  }
}

}

module.exports = UserController;