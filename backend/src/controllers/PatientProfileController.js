const PatientProfile = require('../models/PatientProfile');
const User = require('../models/User'); 

class PatientProfileController {
  static async getProfile(req, res) {
    try {
      const user_id = req.user.id;
      const user = await User.findById(user_id);
      if (!user || user.role !== 'patient') {
        return res.status(403).json({ error: 'Acesso negado' });
      }

      const profile = await PatientProfile.getByUserId(user_id);
      res.json({
        nome: user.name,
        email: user.email,
        cpf: user.cpf,
        ...profile
      });
    } catch (e) {
      res.status(500).json({ error: 'Erro ao buscar perfil' });
    }
  }

  static async updateProfile(req, res) {
    try {
      const user_id = req.user.id;
      const user = await User.findById(user_id);
      if (!user || user.role !== 'patient') {
        return res.status(403).json({ error: 'Acesso negado' });
      }

      const {
        nome,
        email,
        cpf,
        phone,
        birth,
        cep,
        about
      } = req.body;

      await User.update(user_id, {
        name: nome,
        email,
        cpf
      });

      const profileData = {
        phone,
        birth,
        cep,
        about,
        profile_completed: Boolean(phone && birth && cep && cpf) 
      };
      const profile = await PatientProfile.createOrUpdateByUserId(user_id, profileData);

      res.json({
        nome: nome,
        email: email,
        cpf: cpf,
        ...profile
      });
    } catch (e) {
      console.error('Erro detalhado:', e);
      res.status(500).json({ error: 'Erro ao atualizar perfil' });
    }
  }
}

module.exports = PatientProfileController;
