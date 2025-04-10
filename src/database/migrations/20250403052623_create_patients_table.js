/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// tabela de pacientes

exports.up = function(knex) {
  return knex.schema.createTable('patients', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.text('condition').notNullable();
    table.timestamps(true, true);
  });
};

  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
  return knex.schema.dropTable('patients');
};


  
