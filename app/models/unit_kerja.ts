import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, Has, HasOne, HasMany } from '@adonisjs/lucid/types/relations'
import Pegawai from './pegawai.js'

export default class UnitKerja extends BaseModel {
  static table = 'unit_kerja'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare unit_kerja: string

  @hasMany(() => Pegawai)
  declare pegawai: HasMany<typeof Pegawai>
}

