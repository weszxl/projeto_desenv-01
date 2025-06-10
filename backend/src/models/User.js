const db = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  async create({ name, email, password, role, cpf }) {
    const password_hash = await bcrypt.hash(password, 8);
    const [user] = await db('users')
      .insert({
        name,
        email,
        password_hash,
        role,
        cpf
      })
      .returning(['id', 'name', 'email', 'role', 'cpf', 'created_at']);
    
    return user;
  },

  async findByEmail(email) {
    return db('users')
      .where({ email })
      .first();
  },

  async findById(id) {
    return db('users')
      .where({ id })
      .first();
  },

  async findByRole(role) {
    return db('users')
      .where({ role })
      .select(['id', 'name', 'email', 'role', 'cpf', 'created_at']);
  },

  async update(id, data) {
    const [user] = await db('users')
      .where({ id })
      .update(data)
      .returning(['id', 'name', 'email', 'role', 'cpf', 'updated_at']);
    
    return user;
  },

  async delete(id) {
    return db('users')
      .where({ id })
      .del();
  },

  async validatePassword(password, password_hash) {
    return bcrypt.compare(password, password_hash);
  }
};

module.exports = User;