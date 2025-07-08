exports.up = function(knex) {
  return knex.schema.createTable('student_profiles', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().unique()
      .references('id').inTable('users')
      .onDelete('CASCADE');
      
    table.integer('professor_id').notNullable()
      .references('id').inTable('users')
      .onDelete('CASCADE');

    table.string('phone').nullable();
    table.date('birth_date').nullable();
    table.string('cep').nullable();
    table.text('about_me').nullable();
    table.string('photo_url').nullable();

    table.string('course_name').nullable();
    table.string('institution').nullable();
    table.integer('semester').nullable();
    table.string('register_number').nullable();
    table.enum('academic_status', ['active', 'locked']).defaultTo('active');
    table.date('start_date').nullable();
    table.date('end_date').nullable();
    table.string('enrolment_url').nullable();
    table.boolean('profile_completed').defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('student_profiles');
};