import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users_modules'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table
        .integer('module_id')
        .unsigned()
        .references('id')
        .inTable('modules')
        .onDelete('CASCADE')

      table.timestamp('created_at')

      table.unique(['user_id', 'module_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}