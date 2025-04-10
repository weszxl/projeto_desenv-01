const db = require('../config/database');
const bcrypt = require('bcrypt');


class Student {
  static async create(studentData) {
    const hashedPassword = await bcrypt.hash(studentData.password, 10); // hash senha
    const [id] = await db('students').insert({
      name: studentData.name,
      email: studentData.email,
      password: hashedPassword, // salva o hash
      area: studentData.area
      
    });
    return id;
  }

  static async findByEmail(email) {
    const user = await db('students').where({ email }).first();
    return user;

  }

  // checar conflitos de horário
  static async isAvailable(studentId, startTime, endTime) {
    const conflictingAppointments = await db('appointments')
      .where('student_id', studentId)
      .andWhere(function() {
        this.whereBetween('start_time', [startTime, endTime])
          .orWhereBetween('end_time', [startTime, endTime]);
      });
  
    return conflictingAppointments.length === 0;
  }

  static async findById(id) {
    return db('students').where({ id }).first();
  }

  static async update(id, updateData) {
    return db('students').where({ id }).update(updateData);
  }

  
}



module.exports = Student;