import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasOne, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Role from './role.js'
import Adresse from './adresse.js'
import actualite from './actualite.js'
import module from './module.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare roleId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relation : un user appartient à un rôle
  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @hasOne(() => Adresse)
  declare adresse: HasOne<typeof Adresse>

  @hasMany(() => actualite)
  declare actualites: HasMany<typeof actualite>

  @manyToMany(() => module, { pivotTable: 'users_modules' })
  declare modules: ManyToMany<typeof module>
  
}