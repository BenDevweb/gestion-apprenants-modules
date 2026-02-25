import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import user from '#models/user'

export default class Module extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare title: string
  
  @column()
  declare description: string 

  @column()
  declare duration: number
  
 @manyToMany(() => user, { pivotTable: 'users_modules' })
  declare users: ManyToMany<typeof user>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}