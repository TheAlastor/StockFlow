exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
      table.string('user_id').notNullable()
      table.string('name').notNullable()
      table.string('password').notNullable()
      table.string('p_email').notNullable()
      table.string('f_email').notNullable()
      table.mediumblob('picture').notNullable()
      table.boolean('admin').defaultTo(false).notNullable()
    })
  }
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users')
  }
   