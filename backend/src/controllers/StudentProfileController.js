const StudentProfile = require('../models/StudentProfile');
const User = require('../models/User');

class StudentProfileController {
  static async getProfile(req, res) {
    try {
      const user_id = req.user.id;
      const user = await User.findById(user_id);
      if (!user || user.role !== 'student') {
        return res.status(403).json({ error: 'Acesso negado' });
      }

      const profile = await StudentProfile.getByUserId(user_id);
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
      if (!user || user.role !== 'student') {
        return res.status(403).json({ error: 'Acesso negado' });
      }

      const currentProfile = await StudentProfile.getByUserId(user_id) || {};

      const updatedProfile = {
        ...currentProfile,
        ...req.body,
      };

      updatedProfile.profile_completed = Boolean(
        updatedProfile.phone &&
        updatedProfile.birth_date &&
        updatedProfile.cep &&
        updatedProfile.course_name &&
        updatedProfile.institution &&
        updatedProfile.semester &&
        updatedProfile.register_number &&
        updatedProfile.start_date &&
        updatedProfile.end_date
      );

      const profile = await StudentProfile.createOrUpdateByUserId(user_id, updatedProfile);

      res.json({
        nome: user.name,
        email: user.email,
        cpf: user.cpf,
        ...profile
      });
    } catch (e) {
      console.error('Erro ao atualizar perfil:', e);
      res.status(500).json({ error: 'Erro ao atualizar perfil' });
    }
  }
}

module.exports = StudentProfileController;