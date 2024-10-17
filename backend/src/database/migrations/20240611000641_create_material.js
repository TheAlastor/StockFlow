exports.up = function (knex) {
  return knex.schema.createTable('materials', function (table) {
    table.increments('material_id').primary()
    table.integer('code').notNullable()
    table.string('quantity').notNullable()
    table.integer('status').notNullable()

    table.integer('request_id').notNullable()
    table.foreign('request_id').references('request_id').inTable('requests')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('materials')
}
