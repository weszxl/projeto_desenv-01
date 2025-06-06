const db = require('../config/database');

const Availability = {
  async create(data) {
    const [id] = await db('availabilities').insert(data);
    return { id, ...data };
  },

  async getByStudentId(studentId) {
    return db('availabilities')
      .where({ student_id: studentId })
      .orderBy(['date', 'start_time']);
  },

  async countByDate(studentId, date) {
    return db('availabilities')
      .where({ student_id: studentId, date })
      .count('id as total')
      .first();
  },

  async hasOverlap(studentId, date, start_time, end_time) {
    return db('availabilities')
      .where({ student_id: studentId, date })
      .andWhere((query) => {
        query
          .whereBetween('start_time', [start_time, end_time])
          .orWhereBetween('end_time', [start_time, end_time])
          .orWhere(function () {
            this.where('start_time', '<=', start_time).andWhere('end_time', '>=', end_time);
          });
      })
      .first();
  }
};

module.exports = Availability;




  