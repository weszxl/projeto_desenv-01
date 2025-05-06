/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// tabela de reviews

exports.up = function(knex) {
  return knex.schema.createTable('reviews', (table) => {
    table.increments('id').primary();
    table.integer('student_id').unsigned().references('id').inTable('students');
    table.integer('patient_id').unsigned().references('id').inTable('patients');
    table.integer('rating').notNullable();
    table.text('comment');
    table.timestamps(true, true);
  });
};

  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('reviews');
};

  
