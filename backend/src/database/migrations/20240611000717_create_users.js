exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.string('user_id').notNullable().primary()
    table.string('name').notNullable()
    table.string('password').notNullable()
    table.string('p_mail').notNullable()
    table.string('f_mail').notNullable()
    table.mediumblob('picture').notNullable()
    table.integer('role').defaultTo(0).notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
