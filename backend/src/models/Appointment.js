const db = require('../config/database');

const Appointment = {
  async create(data) {
    const [id] = await db('appointments').insert(data);
    return { id, ...data };
  },

  async getByUserId(userId, role) {
    if (role === 'student') {
      return db('appointments').where({ student_id: userId });
    } else if (role === 'patient') {
      return db('appointments').where({ patient_id: userId });
    } else {
      return [];
    }
  },

  async isTimeTaken(student_id, date, start_time, end_time) {
    return db('appointments')
      .where({ student_id, date })
      .andWhere((q) => {
        q.whereBetween('start_time', [start_time, end_time])
         .orWhereBetween('end_time', [start_time, end_time]);
      })
      .first();
  }
};

module.exports = Appointment;



