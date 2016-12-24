exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username')
      .unique()
      .notNullable();
    table.string('hashed_pass')
      .notNullable();
    table.integer('views')
      .notNullable()
      .default(0);
    table.string('desc');
    table.string('img');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
