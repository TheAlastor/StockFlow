exports.up = function (knex) {
    return knex.schema.createTable('materials', function (table) {
      //table.increments('material_id')
      table.integer('code').notNullable()
      table.string('quantity').primary()
      table.bool('available').notNullable()
      table.bool('delivered').notNullable()
       
      table.string('request_id').notNullable()
      table.foreign('request_id').references('request_id').inTable('requests')
    })
  }
  
  exports.down = function (knex) {
    return knex.schema.dropTable('materials')
  }