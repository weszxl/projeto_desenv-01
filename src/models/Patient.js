const db = require('../config/database');
const bcrypt = require('bcrypt'); 

class Patient {
  static async create(patientData) {
    const hashedPassword = await bcrypt.hash(patientData.password, 10); 
    const [id] = await db('patients').insert({
      name: patientData.name,
      email: patientData.email,
      password: hashedPassword, 
      condition: patientData.condition
    });
    return id;
  }

  static async findByEmail(email) {
    return db('patients').where({ email }).first();
  }
}

module.exports = Patient;

