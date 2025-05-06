/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// tabela de disponibilidade

exports.up = function(knex) {
  return knex.schema.createTable('availability', (table) => {
    table.increments('id').primary();
    table.integer('student_id').unsigned().references('id').inTable('students');
    table.datetime('start_time').notNullable();
    table.datetime('end_time').notNullable();
    table.boolean('is_booked').defaultTo(false);
    table.timestamps(true, true);
  });
};





/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('availability');
};


