import { BaseModel, column, hasOne, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, Has, HasOne, HasMany } from '@adonisjs/lucid/types/relations'
import Pegawai from './pegawai.js'
export default class Suku extends BaseModel {
  static table = 'suku'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare suku: string

  @hasMany(() => Pegawai)
  declare pegawai: HasMany<typeof Pegawai>
}
