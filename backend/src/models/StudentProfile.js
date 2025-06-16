const db = require('../config/database');

const StudentProfile = {
  async getByUserId(user_id) {
    return db('student_profiles').where({ user_id }).first();
  },

  async createOrUpdateByUserId(user_id, data) {
    const existing = await db('student_profiles').where({ user_id }).first();
    if (existing) {
      await db('student_profiles').where({ user_id }).update({
        ...data,
        updated_at: db.fn.now(),
      });
      return db('student_profiles').where({ user_id }).first();
    } else {
      await db('student_profiles').insert({
        user_id,
        ...data,
        created_at: db.fn.now(),
        updated_at: db.fn.now(),
      });
      return db('student_profiles').where({ user_id }).first();
    }
  }
};

module.exports = StudentProfile;