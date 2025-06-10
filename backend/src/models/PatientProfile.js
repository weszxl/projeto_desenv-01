const db = require('../config/database');

const PatientProfile = {
  async create(data) {
    const profile_completed = Boolean(data.phone && data.birth && data.cep);
    const [profile] = await db('patient_profile')
      .insert({
        ...data,
        profile_completed
      })
      .returning('*');
    
    return profile;
  },

  async findByUserId(user_id) {
    return db('patient_profile')
      .where({ user_id })
      .first();
  },

  async update(user_id, data) {
    const current = await this.findByUserId(user_id);
    
    const profile_completed = Boolean(
      (data.phone || current?.phone) &&
      (data.birth || current?.birth) &&
      (data.cep || current?.cep)
    );

    const [profile] = await db('patient_profile')
      .where({ user_id })
      .update({
        ...data,
        profile_completed,
        updated_at: db.fn.now()
      })
      .returning('*');
    
    return profile;
  },

  async delete(user_id) {
    return db('patient_profile')
      .where({ user_id })
      .del();
  },

  async getFullProfile(user_id) {
    return db('patient_profile as pp')
      .join('users as u', 'pp.user_id', '=', 'u.id')
      .where('pp.user_id', user_id)
      .select(
        'u.id',
        'u.name',
        'u.email',
        'u.cpf',
        'pp.phone',
        'pp.birth',
        'pp.cep',
        'pp.about',
        'pp.photo_url',
        'pp.profile_completed',
        'pp.created_at',
        'pp.updated_at'
      )
      .first();
  }
};

module.exports = PatientProfile;