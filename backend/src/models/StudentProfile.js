const db = require('../config/database');

const StudentProfile = {
  async create(data) {
    const profile_completed = Boolean(
      data.phone && 
      data.birth_date && 
      data.cep && 
      data.course_name && 
      data.institution && 
      data.semester && 
      data.register_number && 
      data.start_date && 
      data.end_date
    );

    const [profile] = await db('student_profiles')
      .insert({
        ...data,
        profile_completed
      })
      .returning('*');
    
    return profile;
  },

  async findByUserId(user_id) {
    return db('student_profiles')
      .where({ user_id })
      .first();
  },

  async update(user_id, data) {
    const current = await this.findByUserId(user_id);
    
    const profile_completed = Boolean(
      (data.phone || current?.phone) &&
      (data.birth_date || current?.birth_date) &&
      (data.cep || current?.cep) &&
      (data.course_name || current?.course_name) &&
      (data.institution || current?.institution) &&
      (data.semester || current?.semester) &&
      (data.register_number || current?.register_number) &&
      (data.start_date || current?.start_date) &&
      (data.end_date || current?.end_date)
    );

    const [profile] = await db('student_profiles')
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
    return db('student_profiles')
      .where({ user_id })
      .del();
  },

  async getFullProfile(user_id) {
    return db('student_profiles as sp')
      .join('users as u', 'sp.user_id', '=', 'u.id')
      .where('sp.user_id', user_id)
      .select(
        'u.id',
        'u.name',
        'u.email',
        'u.cpf',
        'sp.phone',
        'sp.birth_date',
        'sp.cep',
        'sp.about_me',
        'sp.photo_url',
        'sp.course_name',
        'sp.institution',
        'sp.semester',
        'sp.register_number',
        'sp.academic_status',
        'sp.start_date',
        'sp.end_date',
        'sp.enrolment_url',
        'sp.profile_completed',
        'sp.created_at',
        'sp.updated_at'
      )
      .first();
  },

  async findActiveStudents() {
    return db('student_profiles as sp')
      .join('users as u', 'sp.user_id', '=', 'u.id')
      .where('sp.academic_status', 'active')
      .select(
        'u.id',
        'u.name',
        'u.email',
        'sp.course_name',
        'sp.institution',
        'sp.semester'
      );
  }
};

module.exports = StudentProfile;