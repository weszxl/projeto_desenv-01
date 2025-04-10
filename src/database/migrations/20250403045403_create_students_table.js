/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// tabela de estudantes
exports.up = function(knex) {
  return knex.schema.createTable('students', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable(); 
    table.string('area').notNullable();
    table.timestamps(true, true);
  });
};

  
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
  return knex.schema.dropTable('students');
};

  