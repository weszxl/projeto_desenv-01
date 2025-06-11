const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;
    
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'credenciais inválidas' });
      }
      
      
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'credenciais inválidas' });
      }
      
      const token = generateToken({
        id: user.id,
        role: user.role,
        name: user.name
      });
      
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: 'ERRO NO SERVIDOR' });
    }
  }

  static async getCurrentUser(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'usuário não encontrado' });
      }
      
      const { password, ...userData } = user;
      res.json(userData);
    } catch (error) {
      res.status(500).json({ error: 'erro na busca de usuário' });
    }
  }
}

module.exports = AuthController;
