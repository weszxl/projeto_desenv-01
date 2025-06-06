exports.up = function(knex) {
  return knex.schema.createTable('availabilities', (table) => {
    table.increments('id').primary();
    table.integer('student_id').notNullable().references('id').inTable('users');
    table.date('date').notNullable();
    table.time('start_time').notNullable();
    table.time('end_time').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('availabilities');
};
