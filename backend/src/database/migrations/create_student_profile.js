exports.up = function(knex) {
  return knex.schema.createTable('student_profiles', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().unique()
      .references('id').inTable('users').onDelete('CASCADE');
    table.integer('professor_id').notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
    table.string('phone');
    table.date('birth_date');
    table.string('cep');
    table.text('about_me');
    table.string('photo_url');
    table.string('course_name');
    table.string('institution');
    table.integer('semester');
    table.string('register_number');
    table.enu('academic_status', ['active', 'locked'], { useNative: true, enumName: 'academic_status' }).defaultTo('active');
    table.date('start_date');
    table.date('end_date');
    table.string('enrolment_url');
    table.boolean('profile_completed').defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('student_profiles');
};