exports.up = function(knex) {
  return knex.schema.createTable('availability', (table) => {
    table.increments('id').primary();
    table.integer('student_id').notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    table.date('date').notNullable();
    table.time('start_time').notNullable();
    table.time('end_time').notNullable();
    table.string('specialty').notNullable();
    table.enu('status', ['available', 'booked', 'cancelled'], { useNative: true, enumName: 'availability_status' }).defaultTo('available');
    table.timestamps(true, true);
    table.unique(['student_id', 'date', 'start_time']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('availability');
};
