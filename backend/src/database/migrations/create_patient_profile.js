exports.up = function(knex) {
  return knex.schema.createTable('patient_profiles', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().unique()
      .references('id').inTable('users').onDelete('CASCADE');
    table.string('phone');
    table.date('birth');
    table.string('cep');
    table.text('about');
    table.string('photo_url');
    table.boolean('profile_completed').defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('patient_profiles');
};