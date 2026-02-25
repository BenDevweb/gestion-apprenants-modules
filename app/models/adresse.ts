import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import user from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Adresse extends BaseModel {
  @column({ isPrimary: true })
  declare id: number 
  
  @column()
  declare rue: string

  @column()
  declare numero: string

  @column()
  declare quartier: string

  @column()
  declare commune: string

  @column()
  declare ville: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => user)
  declare user: BelongsTo<typeof user>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}