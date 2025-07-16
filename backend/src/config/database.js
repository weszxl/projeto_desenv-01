const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.PG_HOST || 'localhost',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || 'sua_senha',
    database: process.env.PG_DATABASE || 'nome_do_banco',
    port: process.env.PG_PORT || 5432,
    ssl: process.env.PG_SSL === 'true' ? { rejectUnauthorized: false } : false
  }
});

module.exports = db;
