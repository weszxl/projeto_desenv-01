const db = require('../config/database');

class Review {
  static async create(reviewData) {
    const [id] = await db('reviews').insert(reviewData);
    return id;
  }

  static async findByStudentId(studentId) {
    return db('reviews').where({ student_id: studentId });
  }
}

module.exports = Review;
