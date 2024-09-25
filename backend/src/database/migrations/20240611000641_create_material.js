exports.up = function (knex) {
  return knex.schema.createTable('materials', function (table) {
    table.increments('material_id').primary()
    table.integer('code').notNullable()
    table.string('quantity').notNullable()
    table.integer('status').notNullable()

    table.integer('reservation').notNullable()
    table.foreign('reservation').references('reservation').inTable('requests')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('materials')
}
