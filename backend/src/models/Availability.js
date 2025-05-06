const db = require('../config/database');

class Availability {
    static async create(availabilityData) {
      const [id] = await db('availability').insert(availabilityData);
      return id;
    }
  
    static async findByStudentId(studentId) {
      return db('availability').where({ student_id: studentId });
    }
  }
  
  module.exports = Availability;
  