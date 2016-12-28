exports.up = function(knex) {
  return knex.schema.createTable('projects', (table) => {
    table.increments();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.specificType('build', 'json[]');
    table.integer('views')
      .notNullable()
      .default(0);
    table.string('title')
    table.string('desc');
    table.string('genre');
    table.integer('votes').default(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects');
};
