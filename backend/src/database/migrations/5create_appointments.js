exports.up = function(knex) {
  return knex.schema.createTable('appointments', (table) => {
    table.increments('id').primary();
    table.integer('patient_id').notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    table.integer('student_id').notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    table.integer('slot_id').notNullable()
      .references('id').inTable('availability').onDelete('CASCADE');
    table.date('date').notNullable();
    table.time('start_time').notNullable();
    table.time('end_time').notNullable();
    table.enu('status', ['scheduled', 'completed', 'cancelled'], { useNative: true, enumName: 'appointment_status' }).defaultTo('scheduled');
    table.text('cancellation_reason');
    table.integer('cancellation_requested_by')
      .references('id').inTable('users');
    table.boolean('reschedule_requested').defaultTo(false);
    table.integer('reschedule_requested_by')
      .references('id').inTable('users');
    table.string('meet_link');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('appointments');
};
