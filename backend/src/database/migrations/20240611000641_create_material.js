exports.up = function (knex) {
  return knex.schema.createTable('materials', function (table) {
    //table.increments('material_id')
    table.integer('code').notNullable()
    table.string('quantity').primary()
    table.bool('status').notNullable()
    
    table.string('reservation').notNullable() 
    table.foreign('reservation').references('reservation').inTable('requests')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('materials')
}
