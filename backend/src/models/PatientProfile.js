const db = require('../config/database');

const PatientProfile = {
  async getByUserId(user_id) {
    return db('patient_profiles').where({ user_id }).first();
  },

  async createOrUpdateByUserId(user_id, data) {
    const existing = await db('patient_profiles').where({ user_id }).first();
    if (existing) {
      await db('patient_profiles').where({ user_id }).update({
        ...data,
        updated_at: db.fn.now(),
      });
      return db('patient_profiles').where({ user_id }).first();
    } else {
      await db('patient_profiles').insert({
        user_id,
        ...data,
        created_at: db.fn.now(),
        updated_at: db.fn.now(),
      });
      return db('patient_profiles').where({ user_id }).first();
    }
  }
};

module.exports = PatientProfile;