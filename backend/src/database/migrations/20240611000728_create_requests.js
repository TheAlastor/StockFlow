exports.up = function (knex) {
  return knex.schema.createTable('requests', function (table) {
    table.increments('request_id')
    table.integer('reservation').primary()
    table.bool('urgency').notNullable()
    table.string('comments').notNullable()
    table.integer('step').notNullable()
    table.date('date')

    table.string('user_id').notNullable()
    table.foreign('user_id').references('user_id').inTable('users')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('requests')
}
