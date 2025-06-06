const db = require('../config/database');

class User {
  static async create(user) {
    const [id] = await db('users').insert(user);
    return this.findById(id);
  }

  static async findByEmail(email) {
    return db('users').where({ email }).first();
  }

  static async findById(id) {
    return db('users').where({ id }).first();
  }

  static async isEmailTaken(email) {
    const user = await this.findByEmail(email);
    return !!user;
  }
}

module.exports = User;