exports.up = function(knex) {
  return knex.schema.createTable('appointments', (table) => {
    table.increments('id').primary();

    table.integer('patient_id').notNullable()
      .references('id').inTable('users')
      .onDelete('CASCADE');

    table.integer('student_id').notNullable()
      .references('id').inTable('users')
      .onDelete('CASCADE');

    table.date('date').notNullable();
    table.time('start_time').notNullable();
    table.time('end_time').notNullable();

    table.string('status').notNullable().defaultTo('agendada'); // agendada, realizada, cancelada
    table.string('meet_link'); // link do Google Meet

    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('appointments');
};

