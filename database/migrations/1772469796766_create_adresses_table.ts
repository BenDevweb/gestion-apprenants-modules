import { BaseSchema } from '@adonisjs/lucid/schema'



export default class extends BaseSchema {
  protected tableName = 'adresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('rue').notNullable()
      table.string('numero').notNullable()
      table.string('quartier').notNullable()
      table.string('commune').notNullable()
      table.string('ville').notNullable()

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}