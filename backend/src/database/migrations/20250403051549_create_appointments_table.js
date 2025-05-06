/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// tabela de agendamentos
exports.up = function(knex) {
  return knex.schema.createTable('appointments', (table) => {
    table.increments('id').primary();
    table.integer('student_id').unsigned().references('id').inTable('students');
    table.integer('patient_id').unsigned().references('id').inTable('patients');
    table.datetime('start_time').notNullable();
    table.datetime('end_time').notNullable();
    table.string('google_meet_link');
    table.integer('availability_id').unsigned().references('id').inTable('availability');
    table.timestamps(true, true);
  });
};

  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
  return knex.schema.dropTable('appointments');
};

  
