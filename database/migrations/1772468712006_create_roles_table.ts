import { RoleName } from './../../app/models/role';
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
     

      table
        .string('roleName')
        .notNullable()
        .unique()

        table
  .integer('user_id')
  .notNullable()
  .unique()
  .references('id')
  .inTable('users')
  .onDelete('CASCADE')
table.enum('name', ['ADMIN', 'APPRENANTS']).notNullable().defaultTo('APPRENANTS')



      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}