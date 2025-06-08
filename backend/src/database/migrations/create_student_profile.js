exports.up = function(knex) {
  return knex.schema.createTable('student_profiles', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().unique()
      .references('id').inTable('users')
      .onDelete('CASCADE');
    // dados Pessoais
    table.string('phone');
    table.date('birth_date');
    table.string('cep');
    table.text('about_me'); 
    table.string('photo_url');
    
    // dados acadêmicos
    table.string('course_name').notNullable();
    table.string('institution').notNullable();
    table.integer('semester').notNullable();
    table.string('register_number').notNullable();
    table.enum('academic_status', ['active', 'locked']).defaultTo('active');
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();
    table.string('enrolment_url');
    
    table.boolean('profile_completed').defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('student_profiles');
};